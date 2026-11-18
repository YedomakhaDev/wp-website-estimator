import { Input } from "@/components/base/Input";
import { applyHourlyRate } from "@/lib/calculator";
import type { EstimateResult } from "@/lib/types";

import { formatCostRange, formatRange, getScopeDescriptor } from "../utils";

interface EstimateSummaryProps {
    estimate: EstimateResult;
    projectTypeLabel: string | null;
    hourlyRate: number | "";
    onHourlyRateChange: (rate: number | "") => void;
}

export function EstimateSummary({ estimate, projectTypeLabel, hourlyRate, onHourlyRateChange }: EstimateSummaryProps) {
    return (
        <div className="space-y-3">
            <div>
                {projectTypeLabel && (
                    <p className="text-sm font-medium text-foreground">
                        {getScopeDescriptor(projectTypeLabel, estimate.totalHours)}
                    </p>
                )}
                <p className="text-3xl font-bold tracking-tight text-foreground">{formatRange(estimate.totalHours)}</p>
                <p className="text-xs text-muted-foreground">Based on what&apos;s answered so far.</p>
            </div>

            <label className="flex items-center justify-between gap-2 text-sm text-foreground">
                <span>Hourly rate (optional)</span>
                <Input
                    type="number"
                    min={0}
                    value={hourlyRate}
                    onChange={(event) =>
                        onHourlyRateChange(event.target.value === "" ? "" : Math.max(0, Number(event.target.value)))
                    }
                    className="w-24"
                />
            </label>

            {hourlyRate !== "" && hourlyRate > 0 && (
                <div>
                    <p className="text-sm text-muted-foreground">Estimated cost</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                        {formatCostRange(applyHourlyRate(estimate.totalHours, hourlyRate))}
                    </p>
                </div>
            )}
        </div>
    );
}
