import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// The standard surface card: rounded, bordered, padded, subtle shadow. Extra
// layout (sticky, spacing, width) and a ref come through props / className.
export function Card({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("rounded-card border border-border bg-surface p-6 shadow-sm", className)} {...props} />;
}
