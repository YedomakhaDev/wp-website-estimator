"use client";

import { useState } from "react";
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
        <div>
            {questions.map((question) => {
                const currentValue = getAnswerValue(question.id);

                return (
                    <fieldset key={question.id}>
                        <legend>{question.label}</legend>

                        {question.type === "single-choice" &&
                            question.options?.map((option) => (
                                <label key={option.value}>
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
                                    <label key={option.value}>
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
                            />
                        )}
                    </fieldset>
                );
            })}
        </div>
    );
}
