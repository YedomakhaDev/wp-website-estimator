import {
    AnswerMap,
    Bucket,
    CalculationResult,
    ConfidenceLevel,
    DiscoveryRecommendation,
    EstimateResult,
    HourRange,
    Question,
    QuantityQuestion,
    QuestionOption,
    RiskAxis,
    RiskContribution,
    Step,
    WorkstreamHours,
} from "./types";

const ZERO: HourRange = { min: 0, max: 0 };

function addRange(a: HourRange, b: HourRange): HourRange {
    return { min: a.min + b.min, max: a.max + b.max };
}

function scaleRange(range: HourRange, factor: number): HourRange {
    return { min: range.min * factor, max: range.max * factor };
}

// Global components (header, footer, nav, base styles) are billed on every
// project regardless of answers, so they are a constant rather than an effect.
const FRONTEND_COMPONENTS_BASE: HourRange = { min: 12, max: 16 };

// Multi-select / count-based risk categories cap their total contribution
// so one category can't dominate the score. See "Risk model" in the plan.
const RISK_CATEGORY_CAPS: Record<string, number> = {
    integrations: 3,
    risk_factors: 4,
};

const PM_BASE_PERCENT = 10;
const PM_MAX_PERCENT = 25;
const RESERVE_CAP_PERCENT = 35;

const DESIGN_COMPLEXITY_MULTIPLIER: Record<string, number> = {
    standard: 1.0,
    custom: 1.2,
    creative: 1.5,
};

const EDITOR_FLEXIBILITY_MULTIPLIER: Record<string, number> = {
    rigid: 0.9,
    flexible: 1.0,
    full: 1.3,
};

const LANGUAGE_MULTIPLIER: Record<string, number> = {
    one: 1.0,
    two: 1.2,
    few: 1.3,
    many: 1.4,
};

// Price per unique block/section depends on how the site is built (step 2),
// so unique_blocks reads this instead of a fixed rate.
const BUILD_APPROACH_BLOCK_PRICE: Record<string, HourRange> = {
    page_builder: { min: 1, max: 2 },
    theme_child: { min: 1, max: 2 },
    custom_acf: { min: 3, max: 4 },
    native_gutenberg: { min: 4, max: 6 },
};
const DEFAULT_BLOCK_PRICE: HourRange = { min: 2, max: 3 };

export function blockPriceFor(answers: AnswerMap): HourRange {
    const buildApproach = answers.build_approach;
    if (typeof buildApproach !== "string") return DEFAULT_BLOCK_PRICE;
    return BUILD_APPROACH_BLOCK_PRICE[buildApproach] ?? DEFAULT_BLOCK_PRICE;
}

// A global Options Page is billed automatically once the site has any CMS data
// (a CPT, or an ACF-driven build) to manage — not tied to a single question.
const OPTIONS_PAGE_HOURS: HourRange = { min: 2, max: 3 };

function getQuantity(answers: AnswerMap, questionId: string, fieldId: string): number {
    const value = answers[questionId];
    if (!value || typeof value !== "object" || Array.isArray(value)) return 0;
    return value[fieldId] ?? 0;
}

function needsOptionsPage(answers: AnswerMap): boolean {
    return getQuantity(answers, "cpt_count", "count") > 0 || answers.build_approach === "custom_acf";
}

// ACF and native Gutenberg builds get the full CMS/data step (including editor_flexibility);
// page builder and ready-made theme builds only see cpt_count. Exported so questions.ts can
// reuse it for visibleIf — a single source of truth keeps a stale editor_flexibility answer
// (left over from switching build_approach) from silently leaking into the multiplier below.
export function isFullCmsBuild(answers: AnswerMap): boolean {
    return answers.build_approach === "custom_acf" || answers.build_approach === "native_gutenberg";
}

function findOption(question: Question, value: string): QuestionOption | undefined {
    if (question.type === "quantity") return undefined;
    return question.options.find((option) => option.value === value);
}

function isVisible(question: Question, answers: AnswerMap): boolean {
    return question.visibleIf ? question.visibleIf(answers) : true;
}

function getMultiplier(
    answers: AnswerMap,
    questionId: string,
    byValue: Record<string, number>,
    fallback: number,
): number {
    const value = answers[questionId];
    if (typeof value !== "string") return fallback;
    return byValue[value] ?? fallback;
}

function emptyBuckets(): Record<Bucket, HourRange> {
    return {
        buildSetup: ZERO,
        frontendComponents: FRONTEND_COMPONENTS_BASE,
        frontendBlocks: ZERO,
        frontendTemplates: ZERO,
        frontendHeader: ZERO,
        frontendAnimations: ZERO,
        cms: ZERO,
        functionality: ZERO,
        woo: ZERO,
        booking: ZERO,
        integrations: ZERO,
        i18n: ZERO,
        content: ZERO,
        seoQuality: ZERO,
        infraFixed: ZERO,
        docs: ZERO,
    };
}

type EngineState = {
    buckets: Record<Bucket, HourRange>;
    riskEntries: RiskContribution[];
    qaPercent: number;
    pmPercentExtra: number;
    frontendPercentTotal: number;
    assumptions: string[];
    stop: string | null;
};

function processOption(state: EngineState, question: Question, option: QuestionOption): void {
    state.assumptions.push(`${question.label}: ${option.label}`);

    const effect = option.effect;
    if (!effect) return;

    if (effect.stopFlag) {
        state.stop = option.label;
        return;
    }

    if (effect.bucket && effect.hours) {
        state.buckets[effect.bucket] = addRange(state.buckets[effect.bucket], effect.hours);
    }

    if (effect.risk) {
        state.riskEntries.push(...effect.risk);
    }

    if (typeof effect.qaPercent === "number") {
        state.qaPercent += effect.qaPercent;
    }

    if (typeof effect.pmPercent === "number") {
        state.pmPercentExtra += effect.pmPercent;
    }

    if (typeof effect.frontendPercent === "number") {
        state.frontendPercentTotal += effect.frontendPercent;
    }
}

function processQuantity(state: EngineState, question: QuantityQuestion, answers: AnswerMap): void {
    const raw = answers[question.id];
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;

    for (const field of question.fields) {
        const quantity = raw[field.id] ?? 0;
        if (quantity <= 0) continue;

        const perUnit = typeof field.hoursPerUnit === "function" ? field.hoursPerUnit(answers) : field.hoursPerUnit;
        state.buckets[field.bucket] = addRange(state.buckets[field.bucket], scaleRange(perUnit, quantity));

        if (field.riskPerUnit) {
            state.riskEntries.push({ ...field.riskPerUnit, points: field.riskPerUnit.points * quantity });
        }

        state.assumptions.push(`${question.label} — ${field.label}: ${quantity}`);
    }
}

function processSteps(steps: Step[], answers: AnswerMap): EngineState {
    const state: EngineState = {
        buckets: emptyBuckets(),
        riskEntries: [],
        qaPercent: 0,
        pmPercentExtra: 0,
        frontendPercentTotal: 0,
        assumptions: [],
        stop: null,
    };

    for (const step of steps) {
        for (const question of step.questions) {
            if (!isVisible(question, answers)) continue;

            if (question.type === "quantity") {
                processQuantity(state, question, answers);
                continue;
            }

            const value = answers[question.id];

            if (question.type === "single-choice" && typeof value === "string") {
                const option = findOption(question, value);
                if (option) processOption(state, question, option);
            }

            if (question.type === "multi-choice" && Array.isArray(value)) {
                for (const selected of value) {
                    const option = findOption(question, selected);
                    if (option) processOption(state, question, option);
                }
            }
        }
    }

    return state;
}

function tallyRiskAxis(entries: RiskContribution[], axis: RiskAxis): number {
    const capped = new Map<string, number>();
    let uncapped = 0;

    for (const entry of entries) {
        if (entry.axis !== axis) continue;
        if (entry.cappedCategory) {
            capped.set(entry.cappedCategory, (capped.get(entry.cappedCategory) ?? 0) + entry.points);
        } else {
            uncapped += entry.points;
        }
    }

    let total = uncapped;
    for (const [category, points] of capped) {
        const cap = RISK_CATEGORY_CAPS[category] ?? Infinity;
        total += Math.min(points, cap);
    }

    return total;
}

// design_complexity and editor_flexibility both apply to "blocks", and pixel_perfect /
// accessibility_level both apply to "frontend" as a whole — see "Multiplier rules" in the
// plan for why this needs an explicit pipeline instead of generic per-option multipliers.
function buildFrontendFinal(state: EngineState, answers: AnswerMap): HourRange {
    const designComplexity = getMultiplier(answers, "design_complexity", DESIGN_COMPLEXITY_MULTIPLIER, 1.0);
    const editorFlexibility = isFullCmsBuild(answers)
        ? getMultiplier(answers, "editor_flexibility", EDITOR_FLEXIBILITY_MULTIPLIER, 1.0)
        : 1.0;

    const componentsAndTemplates = scaleRange(
        addRange(state.buckets.frontendComponents, state.buckets.frontendTemplates),
        designComplexity,
    );
    const blocks = scaleRange(state.buckets.frontendBlocks, designComplexity * editorFlexibility);
    const unmultiplied = addRange(
        addRange(state.buckets.frontendHeader, state.buckets.frontendAnimations),
        state.buckets.buildSetup,
    );
    const raw = addRange(addRange(componentsAndTemplates, blocks), unmultiplied);

    return scaleRange(raw, 1 + state.frontendPercentTotal);
}

function buildDiscoveryRecommendation(
    readinessPoints: number,
    executionPoints: number,
): DiscoveryRecommendation | null {
    const readinessTriggered = readinessPoints >= 10;
    const executionTriggered = executionPoints >= 15;

    if (readinessTriggered && executionTriggered) {
        return {
            reason: "both",
            message:
                "Requirements aren't settled and the project is technically complex — recommend a paid discovery phase before committing to a fixed estimate.",
        };
    }
    if (readinessTriggered) {
        return {
            reason: "readiness",
            message:
                "Requirements, design or content aren't ready yet — recommend a paid discovery phase to reduce uncertainty before committing to a fixed estimate.",
        };
    }
    if (executionTriggered) {
        return {
            reason: "execution",
            message:
                "This project has unusually high technical complexity — recommend a paid discovery phase to de-risk the estimate before committing to a fixed scope.",
        };
    }
    return null;
}

export function calculateEstimate(steps: Step[], answers: AnswerMap): CalculationResult {
    const state = processSteps(steps, answers);

    if (state.stop) {
        return { status: "stop", message: state.stop };
    }

    if (needsOptionsPage(answers)) {
        state.buckets.cms = addRange(state.buckets.cms, OPTIONS_PAGE_HOURS);
        state.assumptions.push("CMS & data — Options page: included (CPT or ACF present)");
    }

    const frontendFinal = buildFrontendFinal(state, answers);

    const devLineItems: WorkstreamHours[] = [
        { id: "frontend", label: "Frontend", hours: frontendFinal },
        { id: "cms", label: "CMS & data", hours: state.buckets.cms },
        { id: "functionality", label: "Functionality", hours: state.buckets.functionality },
        { id: "woo", label: "WooCommerce", hours: state.buckets.woo },
        { id: "booking", label: "Booking", hours: state.buckets.booking },
        { id: "integrations", label: "Integrations", hours: state.buckets.integrations },
        { id: "i18n", label: "Multilingual", hours: state.buckets.i18n },
        { id: "content", label: "Content & migration", hours: state.buckets.content },
        { id: "seoQuality", label: "SEO, analytics & quality", hours: state.buckets.seoQuality },
    ];

    let devSubtotal = devLineItems.reduce((total, item) => addRange(total, item.hours), ZERO);

    const languageMultiplier = getMultiplier(answers, "languages", LANGUAGE_MULTIPLIER, 1.0);
    devSubtotal = scaleRange(devSubtotal, languageMultiplier);

    const pmPercent = Math.min(PM_BASE_PERCENT + state.pmPercentExtra, PM_MAX_PERCENT);

    const qaHours = scaleRange(devSubtotal, state.qaPercent / 100);
    const pmHours = scaleRange(devSubtotal, pmPercent / 100);
    const deploymentHours = state.buckets.infraFixed;
    const docsHours = state.buckets.docs;

    const preReserveTotal = [devSubtotal, qaHours, pmHours, deploymentHours, docsHours].reduce(addRange, ZERO);

    const readinessPoints = tallyRiskAxis(state.riskEntries, "readiness");
    const executionPoints = tallyRiskAxis(state.riskEntries, "execution");

    const readinessReservePercent = 5 + readinessPoints * (15 / 14);
    const executionReservePercent = 5 + executionPoints * (15 / 26);
    const reservePercent = Math.min(readinessReservePercent + executionReservePercent, RESERVE_CAP_PERCENT);

    const riskReserveHours = scaleRange(preReserveTotal, reservePercent / 100);
    const totalHours = addRange(preReserveTotal, riskReserveHours);

    const confidenceLevel: ConfidenceLevel = reservePercent < 15 ? "high" : reservePercent <= 25 ? "medium" : "low";

    const workstreamBreakdown: WorkstreamHours[] = [
        ...devLineItems,
        { id: "qa", label: "QA & fixes", hours: qaHours },
        { id: "pm", label: "PM & communication", hours: pmHours },
        { id: "deployment", label: "Deployment", hours: deploymentHours },
        { id: "docs", label: "Documentation", hours: docsHours },
        { id: "riskReserve", label: "Risk reserve", hours: riskReserveHours },
    ];

    const estimate: EstimateResult = {
        workstreamBreakdown,
        totalHours,
        riskReservePercent: reservePercent,
        confidenceLevel,
        discoveryRecommendation: buildDiscoveryRecommendation(readinessPoints, executionPoints),
        assumptions: state.assumptions,
    };

    return { status: "ok", estimate };
}
