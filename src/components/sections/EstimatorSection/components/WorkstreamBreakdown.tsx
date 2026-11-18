import type { WorkstreamHours } from "@/lib/types";

import { formatRange, splitBreakdown } from "../utils";

function BreakdownGroup({ title, items }: { title: string; items: WorkstreamHours[] }) {
    if (items.length === 0) return null;

    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
            <div className="mt-2 space-y-1.5">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span className="text-foreground">{item.label}</span>
                        <span className="text-muted-foreground">{formatRange(item.hours)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface WorkstreamBreakdownProps {
    breakdown: WorkstreamHours[];
}

export function WorkstreamBreakdown({ breakdown }: WorkstreamBreakdownProps) {
    const { development, allowances } = splitBreakdown(breakdown);

    if (development.length === 0 && allowances.length === 0) return null;

    return (
        <div className="space-y-4 border-t border-border pt-6 text-sm">
            <BreakdownGroup title="Development" items={development} />
            <BreakdownGroup title="Project allowances" items={allowances} />
        </div>
    );
}
