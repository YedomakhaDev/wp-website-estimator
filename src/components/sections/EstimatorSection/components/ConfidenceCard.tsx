import { Badge } from "@/components/base/Badge";
import { Notice } from "@/components/base/Notice";
import type { EstimateResult } from "@/lib/types";

interface ConfidenceCardProps {
    confidenceLevel: EstimateResult["confidenceLevel"];
    riskReservePercent: number;
    discoveryRecommendation: EstimateResult["discoveryRecommendation"];
}

export function ConfidenceCard({ confidenceLevel, riskReservePercent, discoveryRecommendation }: ConfidenceCardProps) {
    return (
        <div className="space-y-2 border-t border-border pt-6">
            <div className="space-y-2 rounded-control bg-background p-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Scope confidence:</span>
                    <Badge>{confidenceLevel}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Risk reserve: {Math.round(riskReservePercent)}%</p>
                <p className="text-xs text-muted-foreground">
                    Reflects how well-defined your answers are, not a guarantee of the hour range&apos;s accuracy.
                </p>
            </div>

            {discoveryRecommendation && <Notice>{discoveryRecommendation.message}</Notice>}
        </div>
    );
}
