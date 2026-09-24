"use client";

import { useState } from "react";
import {
    applyHourlyRate,
    calculateEstimate,
    getQuestionnaireProgress,
    isStepComplete,
    isStepVisible,
    isVisible,
} from "@/lib/calculator";
import { steps } from "@/lib/questions";
import { AnswerMap, AnswerValue, HourRange, Question, Step } from "@/lib/types";

function formatRange(range: { min: number; max: number }): string {
    if (range.min === range.max) return `${Math.round(range.min)}h`;
    return `${Math.round(range.min)}–${Math.round(range.max)}h`;
}

function formatCostRange(range: { min: number; max: number }): string {
    const format = (value: number) => Math.round(value).toLocaleString();
    if (range.min === range.max) return `$${format(range.min)}`;
    return `$${format(range.min)}–${format(range.max)}`;
}

type StepStatus = "completed" | "current" | "upcoming";

function getStepStatus(step: Step, answers: AnswerMap, isCurrent: boolean): StepStatus {
    if (isStepComplete(step, answers)) return "completed";
    return isCurrent ? "current" : "upcoming";
}

function getProjectTypeLabel(answers: AnswerMap): string | null {
    const projectTypeQuestion = steps
        .flatMap((step) => step.questions)
        .find((question) => question.id === "project_type");
    if (!projectTypeQuestion || projectTypeQuestion.type === "quantity") return null;

    const option = projectTypeQuestion.options.find((item) => item.value === answers.project_type);
    return option?.label ?? null;
}

// A static "Corporate website" label reads as broken once every dial is maxed
// out (20 blocks, GSAP, Algolia, a role-based portal...) — the label should
// reflect what was actually scoped, not just the project type picked in step 1.
function getScopeDescriptor(projectTypeLabel: string, totalHours: HourRange): string {
    const midpoint = (totalHours.min + totalHours.max) / 2;
    const label = projectTypeLabel.toLowerCase();

    if (midpoint < 200) return `Simple ${label}`;
    if (midpoint < 600) return projectTypeLabel;
    if (midpoint < 1200) return `Large ${label}`;
    return `Highly complex ${label}`;
}

function QuestionField({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: AnswerValue | undefined;
    onChange: (value: AnswerValue) => void;
}) {
    return (
        <fieldset className="border-0 p-0">
            <legend className="text-sm font-medium text-foreground">{question.label}</legend>

            <div className="mt-2 space-y-2">
                {question.type === "single-choice" &&
                    question.options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle"
                        >
                            <input
                                type="radio"
                                name={question.id}
                                checked={value === option.value}
                                onChange={() => onChange(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}

                {question.type === "multi-choice" &&
                    question.options.map((option) => {
                        const selected = Array.isArray(value) ? value : [];
                        const isChecked = selected.includes(option.value);

                        return (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle"
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        const nextValue = isChecked
                                            ? selected.filter((item) => item !== option.value)
                                            : [...selected, option.value];
                                        onChange(nextValue);
                                    }}
                                />
                                {option.label}
                            </label>
                        );
                    })}

                {question.type === "quantity" &&
                    question.fields.map((field) => {
                        const quantities = value && typeof value === "object" && !Array.isArray(value) ? value : {};
                        const fieldValue = quantities[field.id] ?? 0;

                        return (
                            <label
                                key={field.id}
                                className="flex items-center justify-between gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                            >
                                <span>{field.label}</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={fieldValue}
                                    onChange={(event) =>
                                        onChange({ ...quantities, [field.id]: Number(event.target.value) })
                                    }
                                    className="w-24 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                                />
                            </label>
                        );
                    })}
            </div>
        </fieldset>
    );
}

export default function Calculator() {
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [hourlyRate, setHourlyRate] = useState<number | "">("");
    const [currentStepId, setCurrentStepId] = useState<string>(steps[0].id);

    function setAnswer(questionId: string, value: AnswerValue) {
        setAnswers((previous) => ({ ...previous, [questionId]: value }));
    }

    const visibleSteps = steps.filter((step) => isStepVisible(step, answers));
    const foundIndex = visibleSteps.findIndex((step) => step.id === currentStepId);
    const currentIndex = foundIndex === -1 ? 0 : foundIndex;
    const currentStep = visibleSteps[currentIndex];

    const progress = getQuestionnaireProgress(steps, answers);
    const progressPercent = progress.total === 0 ? 0 : Math.round((progress.answered / progress.total) * 100);

    const result = calculateEstimate(steps, answers);
    const projectTypeLabel = getProjectTypeLabel(answers);

    function goTo(index: number) {
        const step = visibleSteps[index];
        if (step) setCurrentStepId(step.id);
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[260px_1fr_320px]">
            <nav className="space-y-1">
                {visibleSteps.map((step, index) => {
                    const status = getStepStatus(step, answers, index === currentIndex);

                    return (
                        <button
                            key={step.id}
                            type="button"
                            onClick={() => goTo(index)}
                            className={`flex w-full items-center gap-3 rounded-control px-3 py-2 text-left ${
                                status === "current" ? "bg-primary-subtle" : ""
                            }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                    status === "completed"
                                        ? "bg-success-subtle text-success"
                                        : status === "current"
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-border text-muted-foreground"
                                }`}
                            >
                                {status === "completed" ? "✓" : index + 1}
                            </span>
                            <span>
                                <span
                                    className={`block text-sm font-medium ${
                                        status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                                    }`}
                                >
                                    {step.title}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    {status === "completed"
                                        ? "Completed"
                                        : status === "current"
                                          ? "In progress"
                                          : "Not started"}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
                <div className="mb-6">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{progressPercent}% complete</p>
                </div>

                {currentStep && (
                    <>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                            Step {currentIndex + 1}
                        </p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                            {currentStep.title}
                        </h2>

                        <div className="mt-6 space-y-6">
                            {currentStep.questions.map((question) => {
                                if (!isVisible(question, answers)) return null;

                                return (
                                    <QuestionField
                                        key={question.id}
                                        question={question}
                                        value={answers[question.id]}
                                        onChange={(value) => setAnswer(question.id, value)}
                                    />
                                );
                            })}
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                            <button
                                type="button"
                                disabled={currentIndex === 0}
                                onClick={() => goTo(currentIndex - 1)}
                                className="rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-40"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                disabled={currentIndex === visibleSteps.length - 1}
                                onClick={() => goTo(currentIndex + 1)}
                                className="rounded-control bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="h-fit space-y-4 rounded-card border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Preliminary estimate
                </p>

                {result.status === "stop" ? (
                    <div className="rounded-control border border-warning/30 bg-warning-subtle p-3 text-sm text-warning">
                        This project needs a custom estimate: {result.message}. Please reach out directly.
                    </div>
                ) : (
                    <>
                        <div>
                            {projectTypeLabel && (
                                <p className="text-sm font-medium text-foreground">
                                    {getScopeDescriptor(projectTypeLabel, result.estimate.totalHours)}
                                </p>
                            )}
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                {formatRange(result.estimate.totalHours)}
                            </p>
                            <p className="text-xs text-muted-foreground">Based on what&apos;s answered so far.</p>
                        </div>

                        <label className="flex items-center justify-between gap-2 text-sm text-foreground">
                            <span>Hourly rate (optional)</span>
                            <input
                                type="number"
                                min={0}
                                value={hourlyRate}
                                onChange={(event) =>
                                    setHourlyRate(event.target.value === "" ? "" : Number(event.target.value))
                                }
                                className="w-24 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                            />
                        </label>

                        {hourlyRate !== "" && hourlyRate > 0 && (
                            <div>
                                <p className="text-sm text-muted-foreground">Estimated cost</p>
                                <p className="text-2xl font-bold tracking-tight text-foreground">
                                    {formatCostRange(applyHourlyRate(result.estimate.totalHours, hourlyRate))}
                                </p>
                            </div>
                        )}

                        <div className="divide-y divide-border rounded-control border border-border text-sm">
                            {result.estimate.workstreamBreakdown.map((item) => (
                                <div key={item.id} className="flex justify-between px-3 py-2">
                                    <span className="text-foreground">{item.label}</span>
                                    <span className="text-muted-foreground">{formatRange(item.hours)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Confidence:</span>
                            <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                                {result.estimate.confidenceLevel}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                (risk reserve {Math.round(result.estimate.riskReservePercent)}%)
                            </span>
                        </div>

                        {result.estimate.discoveryRecommendation && (
                            <div className="rounded-control border border-warning/30 bg-warning-subtle p-3 text-sm text-warning">
                                {result.estimate.discoveryRecommendation.message}
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-medium text-foreground">Assumptions</p>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                {result.estimate.assumptions.map((assumption) => (
                                    <li key={assumption}>{assumption}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
