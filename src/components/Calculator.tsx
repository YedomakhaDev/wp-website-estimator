"use client";

import { useState } from "react";
import { calculateEstimate } from "@/lib/calculator";
import { questions } from "@/lib/questions";
import { Answer, EstimateResult } from "@/lib/types";

export default function Calculator() {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [result, setResult] = useState<EstimateResult | null>(null);

    function setAnswer(questionId: string, value: Answer["value"]) {
        setAnswers((previous) => {
            const withoutThisAnswer = previous.filter((answer) => answer.questionId !== questionId);
            return [...withoutThisAnswer, { questionId, value }];
        });
    }

    function getAnswerValue(questionId: string): Answer["value"] | undefined {
        return answers.find((answer) => answer.questionId === questionId)?.value;
    }

    return (
        <div className="space-y-6 rounded-card border border-border bg-surface p-6 shadow-sm">
            {questions.map((question) => {
                const currentValue = getAnswerValue(question.id);

                return (
                    <fieldset key={question.id} className="border-0 p-0">
                        <legend className="text-sm font-medium text-foreground">
                            {question.label}
                        </legend>

                        <div className="mt-2 space-y-2">
                            {question.type === "single-choice" &&
                                question.options?.map((option) => (
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
                                question.options?.map((option) => {
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

                            {question.type === "number" && (
                                <input
                                    type="number"
                                    value={typeof currentValue === "number" ? currentValue : ""}
                                    onChange={(event) => setAnswer(question.id, Number(event.target.value))}
                                    className="w-full rounded-control border border-border px-3 py-2 text-sm text-foreground"
                                />
                            )}
                        </div>
                    </fieldset>
                );
            })}

            <button
                type="button"
                onClick={() => setResult(calculateEstimate(answers))}
                className="rounded-control bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
                Calculate estimate
            </button>

            {result && (
                <div className="space-y-4 border-t border-border pt-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Estimated development hours</p>
                        <p className="text-3xl font-bold tracking-tight text-foreground">
                            {result.developmentHours}h
                        </p>
                    </div>

                    <div className="divide-y divide-border rounded-control border border-border text-sm">
                        {result.workstreamBreakdown.map((item) => (
                            <div key={item.name} className="flex justify-between px-3 py-2">
                                <span className="text-foreground">{item.name}</span>
                                <span className="text-muted-foreground">{item.hours}h</span>
                            </div>
                        ))}
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-foreground">QA & fixes</span>
                            <span className="text-muted-foreground">{result.qaAllowanceHours}h</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-foreground">PM & communication</span>
                            <span className="text-muted-foreground">{result.pmAllowanceHours}h</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-foreground">Deployment</span>
                            <span className="text-muted-foreground">{result.deploymentHours}h</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-foreground">Risk reserve</span>
                            <span className="text-muted-foreground">{result.riskReserveHours}h</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Confidence:</span>
                        <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                            {result.confidenceLevel}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-foreground">Assumptions</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                            {result.assumptions.map((assumption) => (
                                <li key={assumption}>{assumption}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
