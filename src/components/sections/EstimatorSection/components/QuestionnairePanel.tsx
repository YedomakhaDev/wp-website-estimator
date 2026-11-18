import { Card } from "@/components/base/Card";
import { isVisible } from "@/lib/calculator";
import type { AnswerMap, AnswerValue, Step } from "@/lib/types";

import { QuestionField } from "./QuestionField";
import { StepNavigation } from "./StepNavigation";
import { StepProgress } from "./StepProgress";
import { StepTabs } from "./StepTabs";

interface QuestionnairePanelProps {
    steps: Step[];
    currentIndex: number;
    currentStep: Step | undefined;
    answers: AnswerMap;
    progressPercent: number;
    onSelectStep: (index: number) => void;
    onAnswer: (questionId: string, value: AnswerValue) => void;
    onBack: () => void;
    onContinue: () => void;
}

export function QuestionnairePanel({
    steps,
    currentIndex,
    currentStep,
    answers,
    progressPercent,
    onSelectStep,
    onAnswer,
    onBack,
    onContinue,
}: QuestionnairePanelProps) {
    return (
        <Card className="min-w-0">
            <StepProgress currentIndex={currentIndex} totalSteps={steps.length} progressPercent={progressPercent} />

            <StepTabs
                steps={steps}
                currentIndex={currentIndex}
                currentStepId={currentStep?.id ?? ""}
                answers={answers}
                onSelect={onSelectStep}
            />

            {currentStep && (
                <>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{currentStep.title}</h2>

                    <div className="mt-6 space-y-6">
                        {currentStep.questions.map((question) => {
                            if (!isVisible(question, answers)) return null;

                            return (
                                <QuestionField
                                    key={question.id}
                                    question={question}
                                    value={answers[question.id]}
                                    onChange={(value) => onAnswer(question.id, value)}
                                />
                            );
                        })}
                    </div>

                    <StepNavigation
                        isFirst={currentIndex === 0}
                        isLast={currentIndex === steps.length - 1}
                        onBack={onBack}
                        onContinue={onContinue}
                    />
                </>
            )}
        </Card>
    );
}
