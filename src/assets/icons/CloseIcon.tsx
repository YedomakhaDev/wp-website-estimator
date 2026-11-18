import type { ComponentProps } from "react";

export function CloseIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}
