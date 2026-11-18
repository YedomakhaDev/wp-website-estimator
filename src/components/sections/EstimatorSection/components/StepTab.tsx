import type { Ref } from "react";

import { CheckCircleIcon } from "@/assets/icons/CheckCircleIcon";
import type { Step } from "@/lib/types";

import type { StepStatus } from "../types";

const statusLabel: Record<StepStatus, string> = {
    completed: "Completed",
    "in-progress": "In progress",
    "not-started": "Not started",
};

interface StepTabProps {
    index: number;
    step: Step;
    isActive: boolean;
    status: StepStatus;
    onClick: () => void;
    ref?: Ref<HTMLButtonElement>;
}

export function StepTab({ index, step, isActive, status, onClick, ref }: StepTabProps) {
    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 py-4 text-left text-sm font-medium ${
                isActive
                    ? "border-primary text-foreground"
                    : status === "not-started"
                      ? "border-transparent text-muted-foreground"
                      : "border-transparent text-foreground"
            }`}
        >
            <span>
                <span className="mr-1.5 text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
            </span>
            <span
                className={`flex items-center gap-1 text-xs font-normal ${
                    status === "completed"
                        ? "text-success"
                        : status === "in-progress"
                          ? "text-primary"
                          : "text-muted-foreground"
                }`}
            >
                {status === "completed" && <CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-success" />}
                {statusLabel[status]}
            </span>
        </button>
    );
}
