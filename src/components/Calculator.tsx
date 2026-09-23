"use client";

import { useState } from "react";
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

    return (
        <div>
            <p>Calculator placeholder</p>
        </div>
    );
}
