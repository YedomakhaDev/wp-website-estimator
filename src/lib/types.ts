// A closed range of hours, e.g. "4 to 6 hours" instead of one point value.
export type HourRange = { min: number; max: number };

// The two independent sources of uncertainty the risk model tracks.
// See _plans/1790251989_level-mode-questionnaire.md -> "Risk model".
export type RiskAxis = "readiness" | "execution";

export type RiskContribution = {
    axis: RiskAxis;
    points: number;
    // Multi-select / count-based questions cap their total contribution
    // (e.g. risk_factors caps at R+4) so one category can't dominate the score.
    cappedCategory?: string;
};

// Named accumulators the calculation pipeline sums hours into.
// Mirrors the workstream blocks shown in the result breakdown.
export type Bucket =
    | "buildSetup"
    | "frontendComponents"
    | "frontendBlocks"
    | "frontendTemplates"
    | "frontendHeader"
    | "frontendAnimations"
    | "cms"
    | "functionality"
    | "woo"
    | "booking"
    | "integrations"
    | "i18n"
    | "content"
    | "seoQuality"
    | "infraFixed"
    | "docs";

// What choosing one answer option does to the estimate.
export type Effect = {
    bucket?: Bucket;
    hours?: HourRange;
    // Additive percentage bump applied once to the whole frontend subtotal
    // at the end (pixel_perfect, accessibility_level, desktop-only design).
    frontendPercent?: number;
    risk?: RiskContribution[];
    qaPercent?: number;
    pmPercent?: number;
    stopFlag?: boolean;
};

export type QuestionOption = {
    value: string;
    label: string;
    effect?: Effect;
};

export type AnswerValue = string | string[] | Record<string, number>;
export type AnswerMap = Record<string, AnswerValue | undefined>;

export type VisibleIf = (answers: AnswerMap) => boolean;

// A single quantity field, e.g. one of the three numbers inside the "forms" question.
export type QuantityField = {
    id: string;
    label: string;
    bucket: Bucket;
    // Some rates depend on an earlier answer (unique_blocks price depends on build_approach),
    // so this can be a function instead of a fixed range.
    hoursPerUnit: HourRange | ((answers: AnswerMap) => HourRange);
    riskPerUnit?: RiskContribution;
};

export type QuestionBase = {
    id: string;
    label: string;
    visibleIf?: VisibleIf;
};

export type SingleChoiceQuestion = QuestionBase & {
    type: "single-choice";
    options: QuestionOption[];
};

export type MultiChoiceQuestion = QuestionBase & {
    type: "multi-choice";
    options: QuestionOption[];
};

export type QuantityQuestion = QuestionBase & {
    type: "quantity";
    fields: QuantityField[];
};

export type Question = SingleChoiceQuestion | MultiChoiceQuestion | QuantityQuestion;

export type Step = {
    id: string;
    title: string;
    questions: Question[];
    visibleIf?: VisibleIf;
};

// ---- Result ----

export type ConfidenceLevel = "low" | "medium" | "high";

export type WorkstreamHours = {
    id: string;
    label: string;
    hours: HourRange;
};

export type DiscoveryRecommendation = {
    reason: "readiness" | "execution" | "both";
    message: string;
};

export type EstimateResult = {
    workstreamBreakdown: WorkstreamHours[];
    totalHours: HourRange;
    riskReservePercent: number;
    confidenceLevel: ConfidenceLevel;
    discoveryRecommendation: DiscoveryRecommendation | null;
    assumptions: string[];
    estimatedCost?: HourRange;
};

export type CalculationResult =
    | { status: "ok"; estimate: EstimateResult }
    | { status: "stop"; message: string };
