"use client";

import { useMemo, useReducer, useRef } from "react";

import { calculateEstimate, getQuestionnaireProgress, isStepVisible } from "@/lib/calculator";
import { steps } from "@/lib/questions";

import { EstimatePanel } from "./components/EstimatePanel";
import { QuestionnairePanel } from "./components/QuestionnairePanel";
import { estimatorReducer, initialEstimatorState } from "./state";
import { getProjectTypeLabel } from "./utils";

export function EstimatorSection() {
    const [state, dispatch] = useReducer(estimatorReducer, initialEstimatorState);
    const { answers, currentStepId, hourlyRate } = state;
    const estimatePanelRef = useRef<HTMLDivElement>(null);

    // Everything below is derived from `answers` and memoized on it, so typing an
    // hourly rate (or any UI-only re-render) doesn't recompute the estimate.
    const visibleSteps = useMemo(() => steps.filter((step) => isStepVisible(step, answers)), [answers]);
    const foundIndex = visibleSteps.findIndex((step) => step.id === currentStepId);
    const currentIndex = foundIndex === -1 ? 0 : foundIndex;
    const currentStep = visibleSteps[currentIndex];

    const progress = useMemo(() => getQuestionnaireProgress(steps, answers), [answers]);
    const progressPercent = progress.total === 0 ? 0 : Math.round((progress.answered / progress.total) * 100);

    const result = useMemo(() => calculateEstimate(steps, answers), [answers]);
    const projectTypeLabel = useMemo(() => getProjectTypeLabel(answers), [answers]);

    function goTo(index: number) {
        const step = visibleSteps[index];
        if (step) dispatch({ type: "goToStep", stepId: step.id });
    }

    function handleContinue() {
        // On the last step, "Continue" becomes "View estimate" and scrolls to the panel.
        if (currentIndex === visibleSteps.length - 1) {
            estimatePanelRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
            goTo(currentIndex + 1);
        }
    }

    return (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
            <QuestionnairePanel
                steps={visibleSteps}
                currentIndex={currentIndex}
                currentStep={currentStep}
                answers={answers}
                progressPercent={progressPercent}
                onSelectStep={goTo}
                onAnswer={(questionId, value) => dispatch({ type: "answer", questionId, value })}
                onBack={() => goTo(currentIndex - 1)}
                onContinue={handleContinue}
            />

            <EstimatePanel
                panelRef={estimatePanelRef}
                result={result}
                projectTypeLabel={projectTypeLabel}
                hourlyRate={hourlyRate}
                onHourlyRateChange={(rate) => dispatch({ type: "setHourlyRate", rate })}
                hasAnswers={Object.keys(answers).length > 0}
            />
        </div>
    );
}
