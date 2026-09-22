import { Answer, EstimateResult, WorkstreamHours } from "./types";

const QA_ALLOWANCE_RATIO = 0.15;
const PM_ALLOWANCE_RATIO = 0.1;
const RISK_RESERVE_RATIO = 0.1;
const DEPLOYMENT_HOURS = 4;

const BASE_HOURS_BY_SITE_TYPE: Record<string, number> = {
    brochure: 20,
    blog: 15,
    store: 40,
    custom_app: 60,
};

const HOURS_PER_PAGE = 2;
const HOURS_PER_FEATURE = 4;

function findAnswer(answers: Answer[], questionId: string): Answer | undefined {
    return answers.find((answer) => answer.questionId === questionId);
}

export function calculateDevelopmentHours(answers: Answer[]): {
    developmentHours: number;
    workstreamBreakdown: WorkstreamHours[];
} {
    const siteTypeAnswer = findAnswer(answers, "site_type");
    const siteType = typeof siteTypeAnswer?.value === "string" ? siteTypeAnswer.value : "brochure";
    const baseHours = BASE_HOURS_BY_SITE_TYPE[siteType] ?? BASE_HOURS_BY_SITE_TYPE.brochure;

    const pageCountAnswer = findAnswer(answers, "page_count");
    const pageCount = typeof pageCountAnswer?.value === "number" ? pageCountAnswer.value : 0;
    const pageHours = pageCount * HOURS_PER_PAGE;

    const featuresAnswer = findAnswer(answers, "features");
    const featureCount = Array.isArray(featuresAnswer?.value) ? featuresAnswer.value.length : 0;
    const featureHours = featureCount * HOURS_PER_FEATURE;

    const workstreamBreakdown: WorkstreamHours[] = [
        { name: "Base setup", hours: baseHours },
        { name: "Pages", hours: pageHours },
        { name: "Features", hours: featureHours },
    ];

    return {
        developmentHours: baseHours + pageHours + featureHours,
        workstreamBreakdown,
    };
}

export function calculateEstimate(answers: Answer[]): EstimateResult {
    const { developmentHours, workstreamBreakdown } = calculateDevelopmentHours(answers);

    const qaAllowanceHours = Math.round(developmentHours * QA_ALLOWANCE_RATIO);
    const pmAllowanceHours = Math.round(developmentHours * PM_ALLOWANCE_RATIO);
    const riskReserveHours = Math.round(developmentHours * RISK_RESERVE_RATIO);

    return {
        developmentHours,
        workstreamBreakdown,
        qaAllowanceHours,
        pmAllowanceHours,
        deploymentHours: DEPLOYMENT_HOURS,
        riskReserveHours,
        confidenceLevel: "medium",
        assumptions: [
            "All pages are assumed to be of similar complexity.",
            "Estimate does not include content creation or copywriting.",
            "Confidence level is fixed for now and will become more precise as the calculation logic is refined.",
        ],
    };
}
