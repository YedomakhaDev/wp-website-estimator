"use client";

import { useState } from "react";
import { calculateEstimate } from "@/lib/calculator";
import { steps } from "@/lib/questions";
import { AnswerMap, AnswerValue, CalculationResult } from "@/lib/types";

function formatRange(range: { min: number; max: number }): string {
    if (range.min === range.max) return `${Math.round(range.min)}h`;
    return `${Math.round(range.min)}–${Math.round(range.max)}h`;
}

export default function Calculator() {
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [result, setResult] = useState<CalculationResult | null>(null);

    function setAnswer(questionId: string, value: AnswerValue) {
        setAnswers((previous) => ({ ...previous, [questionId]: value }));
    }

    return (
        <div className="space-y-6 rounded-card border border-border bg-surface p-6 shadow-sm">
            {steps.map((step) => (
                <section key={step.id} className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>

                    {step.questions.map((question) => {
                        if (question.visibleIf && !question.visibleIf(answers)) return null;
                        if (question.type !== "single-choice" && question.type !== "multi-choice") return null;

                        const currentValue = answers[question.id];

                        return (
                            <fieldset key={question.id} className="border-0 p-0">
                                <legend className="text-sm font-medium text-foreground">{question.label}</legend>

                                <div className="mt-2 space-y-2">
                                    {question.type === "single-choice" &&
                                        question.options.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex items-center gap-2 text-sm text-foreground"
                                            >
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    checked={currentValue === option.value}
                                                    onChange={() => setAnswer(question.id, option.value)}
                                                />
                                                {option.label}
                                            </label>
                                        ))}

                                    {question.type === "multi-choice" &&
                                        question.options.map((option) => {
                                            const selected = Array.isArray(currentValue) ? currentValue : [];
                                            const isChecked = selected.includes(option.value);

                                            return (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 text-sm text-foreground"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const nextValue = isChecked
                                                                ? selected.filter((value) => value !== option.value)
                                                                : [...selected, option.value];
                                                            setAnswer(question.id, nextValue);
                                                        }}
                                                    />
                                                    {option.label}
                                                </label>
                                            );
                                        })}
                                </div>
                            </fieldset>
                        );
                    })}
                </section>
            ))}

            <button
                type="button"
                onClick={() => setResult(calculateEstimate(steps, answers))}
                className="rounded-control bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
                Calculate estimate
            </button>

            {result?.status === "stop" && (
                <div className="rounded-control border border-border p-4 text-sm text-foreground">
                    This project needs a custom estimate: {result.message}. Please reach out directly.
                </div>
            )}

            {result?.status === "ok" && (
                <div className="space-y-4 border-t border-border pt-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Estimated total hours</p>
                        <p className="text-3xl font-bold tracking-tight text-foreground">
                            {formatRange(result.estimate.totalHours)}
                        </p>
                    </div>

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
                        <div className="rounded-control border border-border p-3 text-sm text-foreground">
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
                </div>
            )}
        </div>
    );
}
