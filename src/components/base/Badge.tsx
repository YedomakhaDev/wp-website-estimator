import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("rounded-full text-xs font-medium", {
    variants: {
        variant: {
            primary: "bg-primary-subtle px-2 py-0.5 text-primary",
            outline: "border border-border bg-surface px-3 py-1 text-foreground",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

// Small pill label: `primary` for status pills (confidence), `outline` for chips.
export function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
