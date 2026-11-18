import type { ComponentProps } from "react";

export function CheckCircleIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M6 10.5L8.5 13L14 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
