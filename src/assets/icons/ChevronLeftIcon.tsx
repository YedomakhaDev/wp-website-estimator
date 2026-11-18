import type { ComponentProps } from "react";

export function ChevronLeftIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
