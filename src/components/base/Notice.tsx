import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const noticeVariants = cva("rounded-control border p-3 text-sm", {
    variants: {
        variant: {
            warning: "border-warning/30 bg-warning-subtle text-warning",
        },
    },
    defaultVariants: {
        variant: "warning",
    },
});

export interface NoticeProps extends ComponentProps<"div">, VariantProps<typeof noticeVariants> {}

// A callout box (stop message, discovery recommendation). Only a `warning`
// variant for now — add more to the cva map when a second tone appears.
export function Notice({ className, variant, ...props }: NoticeProps) {
    return <div className={cn(noticeVariants({ variant }), className)} {...props} />;
}
