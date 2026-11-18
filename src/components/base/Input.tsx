import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// Generic text field. `type` and every other native <input> attribute
// (value, onChange, min, disabled, ref…) are forwarded, so one component
// covers text / number / email / etc. Width and other layout tweaks come from
// `className` at the call site, not baked into the primitive.
export function Input({ className, ...props }: ComponentProps<"input">) {
    return (
        <input
            className={cn("rounded-control border border-border px-3 py-2 text-sm text-foreground", className)}
            {...props}
        />
    );
}
