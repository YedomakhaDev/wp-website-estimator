import { useEffect, useRef } from "react";

import { useDragToScroll } from "@/hooks/useDragToScroll";
import { useScrollOverflow } from "@/hooks/useScrollOverflow";
import type { AnswerMap, Step } from "@/lib/types";

import { TAB_SCROLL_STEP_PX } from "../consts";
import { getStepStatus } from "../utils";
import { ScrollArrow } from "./ScrollArrow";
import { StepTab } from "./StepTab";

interface StepTabsProps {
    steps: Step[];
    currentIndex: number;
    currentStepId: string;
    answers: AnswerMap;
    onSelect: (index: number) => void;
}

export function StepTabs({ steps, currentIndex, currentStepId, answers, onSelect }: StepTabsProps) {
    const stripRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const { isDragging, onMouseDown, shouldSwallowClick } = useDragToScroll(stripRef);
    const { canScrollLeft, canScrollRight } = useScrollOverflow(stripRef, steps.length);

    // Keep the active tab in view when the step changes (e.g. via Back / Continue).
    useEffect(() => {
        tabRefs.current[currentStepId]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [currentStepId]);

    function handleTabClick(index: number) {
        if (shouldSwallowClick()) return;
        onSelect(index);
    }

    function scrollBy(direction: "left" | "right") {
        stripRef.current?.scrollBy({
            left: direction === "left" ? -TAB_SCROLL_STEP_PX : TAB_SCROLL_STEP_PX,
            behavior: "smooth",
        });
    }

    return (
        <div className="relative -mx-6 border-b border-border">
            <div
                ref={stripRef}
                onMouseDown={onMouseDown}
                className={`flex select-none gap-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
            >
                {steps.map((step, index) => (
                    <StepTab
                        key={step.id}
                        ref={(el) => {
                            tabRefs.current[step.id] = el;
                        }}
                        index={index}
                        step={step}
                        isActive={index === currentIndex}
                        status={getStepStatus(step, answers, index === currentIndex)}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
            </div>

            {canScrollLeft && <ScrollArrow direction="left" onClick={() => scrollBy("left")} />}
            {canScrollRight && <ScrollArrow direction="right" onClick={() => scrollBy("right")} />}
        </div>
    );
}
