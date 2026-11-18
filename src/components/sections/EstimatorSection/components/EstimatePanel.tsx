import type { RefObject } from "react";

import { Card } from "@/components/base/Card";
import { Notice } from "@/components/base/Notice";
import { useFitsViewport } from "@/hooks/useFitsViewport";
import type { CalculationResult } from "@/lib/types";

import { STICKY_OFFSET_PX } from "../consts";
import { AssumptionsModal } from "./AssumptionsModal";
import { ConfidenceCard } from "./ConfidenceCard";
import { EstimateSummary } from "./EstimateSummary";
import { WorkstreamBreakdown } from "./WorkstreamBreakdown";

interface EstimatePanelProps {
    panelRef: RefObject<HTMLDivElement | null>;
    result: CalculationResult;
    projectTypeLabel: string | null;
    hourlyRate: number | "";
    onHourlyRateChange: (rate: number | "") => void;
    hasAnswers: boolean;
}

export function EstimatePanel({
    panelRef,
    result,
    projectTypeLabel,
    hourlyRate,
    onHourlyRateChange,
    hasAnswers,
}: EstimatePanelProps) {
    const canStick = useFitsViewport(panelRef, STICKY_OFFSET_PX);

    return (
        <Card ref={panelRef} className={`h-fit space-y-8 ${canStick ? "lg:sticky lg:top-4" : ""}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preliminary estimate</p>

            {result.status === "stop" ? (
                <Notice>This project needs a custom estimate: {result.message}. Please reach out directly.</Notice>
            ) : (
                <>
                    <EstimateSummary
                        estimate={result.estimate}
                        projectTypeLabel={projectTypeLabel}
                        hourlyRate={hourlyRate}
                        onHourlyRateChange={onHourlyRateChange}
                    />

                    {hasAnswers && (
                        <ConfidenceCard
                            confidenceLevel={result.estimate.confidenceLevel}
                            riskReservePercent={result.estimate.riskReservePercent}
                            discoveryRecommendation={result.estimate.discoveryRecommendation}
                        />
                    )}

                    <WorkstreamBreakdown breakdown={result.estimate.workstreamBreakdown} />

                    {result.estimate.assumptions.length > 0 && (
                        <AssumptionsModal assumptions={result.estimate.assumptions} />
                    )}
                </>
            )}
        </Card>
    );
}
