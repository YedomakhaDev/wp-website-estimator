import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface ProgressBarProps extends ComponentProps<"div"> {
    value: number; // 0–100
    barClassName?: string;
}

// Track + fill bar. `className` sizes the track (height / width), `barClassName`
// recolors the fill (defaults to the primary color).
export function ProgressBar({ value, className, barClassName, ...props }: ProgressBarProps) {
    return (
        <div className={cn("overflow-hidden rounded-full bg-border", className)} {...props}>
            <div
                className={cn("h-full rounded-full bg-primary transition-all", barClassName)}
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
