"use client";

import { useState } from "react";
import { Answer, EstimateResult } from "@/lib/types";

export default function Calculator() {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [result, setResult] = useState<EstimateResult | null>(null);

    return (
        <div>
            <p>Calculator placeholder</p>
        </div>
    );
}
