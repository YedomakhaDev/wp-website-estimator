import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

// `label` is the visible text; the rest (checked, onChange, name, disabled…)
// are forwarded to the native radio input, so it stays controlled by the caller.
interface RadioProps extends Omit<ComponentProps<"input">, "type"> {
    label: ReactNode;
    wrapperClassName?: string;
}

export function Radio({ label, wrapperClassName, ...props }: RadioProps) {
    return (
        <label
            className={cn(
                "flex cursor-pointer items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary-subtle/50 has-[:checked]:border-primary has-[:checked]:bg-primary-subtle has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-1",
                wrapperClassName,
            )}
        >
            <input type="radio" {...props} />
            {label}
        </label>
    );
}
