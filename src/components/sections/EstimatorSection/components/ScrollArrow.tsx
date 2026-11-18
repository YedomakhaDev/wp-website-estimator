import { ChevronLeftIcon } from "@/assets/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";

interface ScrollArrowProps {
    direction: "left" | "right";
    onClick: () => void;
}

export function ScrollArrow({ direction, onClick }: ScrollArrowProps) {
    const isLeft = direction === "left";

    return (
        <>
            <div
                className={`pointer-events-none absolute inset-y-0 w-10 from-surface to-transparent ${
                    isLeft ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"
                }`}
            />
            <button
                type="button"
                onClick={onClick}
                aria-label={isLeft ? "Scroll tabs left" : "Scroll tabs right"}
                className={`absolute top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted-foreground shadow-sm hover:text-foreground ${
                    isLeft ? "left-6" : "right-6"
                }`}
            >
                {isLeft ? <ChevronLeftIcon className="h-3.5 w-3.5" /> : <ChevronRightIcon className="h-3.5 w-3.5" />}
            </button>
        </>
    );
}
