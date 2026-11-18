import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// The small uppercase label that appears above headings and inside cards.
// Two tones: `primary` for section kickers, `muted` for the quieter labels on
// cards (e.g. "Workstream breakdown").
const eyebrowVariants = cva("uppercase tracking-wide", {
    variants: {
        tone: {
            primary: "text-sm font-medium text-primary",
            muted: "text-xs font-semibold text-muted-foreground",
        },
    },
    defaultVariants: {
        tone: "primary",
    },
});

export interface EyebrowProps extends ComponentProps<"p">, VariantProps<typeof eyebrowVariants> {}

export function Eyebrow({ className, tone, ...props }: EyebrowProps) {
    return <p className={cn(eyebrowVariants({ tone }), className)} {...props} />;
}
