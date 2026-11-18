import type { ComponentProps } from "react";

export function ChevronRightIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
