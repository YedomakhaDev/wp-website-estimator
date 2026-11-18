import { steps } from "@/lib/questions";
import type { AnswerMap, AnswerValue } from "@/lib/types";

// All of the estimator's own state in one place. Derived values (visible steps,
// progress, the estimate itself) are NOT stored here — they're computed from
// `answers` in the component, which keeps a single source of truth and the
// determinism guarantee (same answers → same result).
export interface EstimatorState {
    answers: AnswerMap;
    currentStepId: string;
    hourlyRate: number | "";
}

export const initialEstimatorState: EstimatorState = {
    answers: {},
    currentStepId: steps[0].id,
    hourlyRate: "",
};

export type EstimatorAction =
    | { type: "answer"; questionId: string; value: AnswerValue }
    | { type: "goToStep"; stepId: string }
    | { type: "setHourlyRate"; rate: number | "" };

export function estimatorReducer(state: EstimatorState, action: EstimatorAction): EstimatorState {
    switch (action.type) {
        case "answer":
            return { ...state, answers: { ...state.answers, [action.questionId]: action.value } };
        case "goToStep":
            return { ...state, currentStepId: action.stepId };
        case "setHourlyRate":
            return { ...state, hourlyRate: action.rate };
        default:
            return state;
    }
}
