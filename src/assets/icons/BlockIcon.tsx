import type { ComponentProps } from "react";

export function BlockIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}
