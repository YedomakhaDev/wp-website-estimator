export type QuestionType = "single-choice" | "multi-choice" | "number";
export type QuestionOption = {
    value: string;
    label: string;
};
export type Question = {
    id: string;
    label: string;
    type: QuestionType;
    options?: QuestionOption[];
};

export type Answer = {
    questionId: string;
    value: string | string[] | number;
};

export type WorkstreamHours = {
    name: string;
    hours: number;
};

export type ConfidenceLevel = "low" | "medium" | "high";

export type EstimateResult = {
    developmentHours: number;
    workstreamBreakdown: WorkstreamHours[];
    qaAllowanceHours: number;
    pmAllowanceHours: number;
    deploymentHours: number;
    riskReserveHours: number;
    confidenceLevel: ConfidenceLevel;
    assumptions: string[];
    estimatedCost?: number;
};