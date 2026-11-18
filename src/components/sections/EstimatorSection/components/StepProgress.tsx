import { ProgressBar } from "@/components/base/ProgressBar";

interface StepProgressProps {
    currentIndex: number;
    totalSteps: number;
    progressPercent: number;
}

export function StepProgress({ currentIndex, totalSteps, progressPercent }: StepProgressProps) {
    return (
        <div className="-mx-6 -mt-6 rounded-t-card bg-surface px-6 pb-3 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="text-sm font-semibold text-foreground">
                    Step {currentIndex + 1} of {totalSteps}
                </p>
                <p className="text-sm font-medium text-muted-foreground">{progressPercent}% complete</p>
            </div>

            <ProgressBar value={progressPercent} className="mt-2 h-1.5 w-full" />
        </div>
    );
}
