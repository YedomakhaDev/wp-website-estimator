"use client";

import { useEffect, useRef, useState } from "react";
import {
    applyHourlyRate,
    calculateEstimate,
    getQuestionnaireProgress,
    isStepComplete,
    isStepStarted,
    isStepVisible,
    isVisible,
} from "@/lib/calculator";
import { steps } from "@/lib/questions";
import { AnswerMap, AnswerValue, HourRange, Question, Step } from "@/lib/types";

function formatRange(range: { min: number; max: number }): string {
    if (range.min === range.max) return `${Math.round(range.min)}h`;
    return `${Math.round(range.min)}–${Math.round(range.max)}h`;
}

function formatCostRange(range: { min: number; max: number }): string {
    const format = (value: number) => Math.round(value).toLocaleString();
    if (range.min === range.max) return `$${format(range.min)}`;
    return `$${format(range.min)}–${format(range.max)}`;
}

type StepStatus = "completed" | "in-progress" | "not-started";

// A step counts as "in progress" once it's either the one currently open, or
// has at least one answer already — so filling something in and switching
// tabs doesn't make it look untouched again.
function getStepStatus(step: Step, answers: AnswerMap, isCurrent: boolean): StepStatus {
    if (isStepComplete(step, answers)) return "completed";
    if (isCurrent || isStepStarted(step, answers)) return "in-progress";
    return "not-started";
}

function CompletedIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0 text-success">
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

function getProjectTypeLabel(answers: AnswerMap): string | null {
    const projectTypeQuestion = steps
        .flatMap((step) => step.questions)
        .find((question) => question.id === "project_type");
    if (!projectTypeQuestion || projectTypeQuestion.type === "quantity") return null;

    const option = projectTypeQuestion.options.find((item) => item.value === answers.project_type);
    return option?.label ?? null;
}

// A static "Corporate website" label reads as broken once every dial is maxed
// out (20 blocks, GSAP, Algolia, a role-based portal...) — the label should
// reflect what was actually scoped, not just the project type picked in step 1.
function getScopeDescriptor(projectTypeLabel: string, totalHours: HourRange): string {
    const midpoint = (totalHours.min + totalHours.max) / 2;
    const label = projectTypeLabel.toLowerCase();

    if (midpoint < 200) return `Simple ${label}`;
    if (midpoint < 600) return projectTypeLabel;
    if (midpoint < 1200) return `Large ${label}`;
    return `Highly complex ${label}`;
}

function QuestionField({
    question,
    value,
    onChange,
}: {
    question: Question;
    value: AnswerValue | undefined;
    onChange: (value: AnswerValue) => void;
}) {
    const optionsContainerClass = "mt-2 grid gap-2 sm:grid-cols-2";

    return (
        <fieldset className="border-0 p-0">
            <legend className="text-sm font-medium text-foreground">{question.label}</legend>

            <div className={optionsContainerClass}>
                {question.type === "single-choice" &&
                    question.options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle"
                        >
                            <input
                                type="radio"
                                name={question.id}
                                checked={value === option.value}
                                onChange={() => onChange(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}

                {question.type === "multi-choice" &&
                    question.options.map((option) => {
                        const selected = Array.isArray(value) ? value : [];
                        const isChecked = selected.includes(option.value);

                        return (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary-subtle"
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        const nextValue = isChecked
                                            ? selected.filter((item) => item !== option.value)
                                            : [...selected, option.value];
                                        onChange(nextValue);
                                    }}
                                />
                                {option.label}
                            </label>
                        );
                    })}

                {question.type === "quantity" &&
                    question.fields.map((field) => {
                        const quantities = value && typeof value === "object" && !Array.isArray(value) ? value : {};
                        const fieldValue = quantities[field.id] ?? 0;

                        return (
                            <label
                                key={field.id}
                                className="flex items-center justify-between gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                            >
                                <span>{field.label}</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={fieldValue}
                                    onChange={(event) =>
                                        onChange({ ...quantities, [field.id]: Number(event.target.value) })
                                    }
                                    className="w-24 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                                />
                            </label>
                        );
                    })}
            </div>
        </fieldset>
    );
}

export default function Calculator() {
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [hourlyRate, setHourlyRate] = useState<number | "">("");
    const [currentStepId, setCurrentStepId] = useState<string>(steps[0].id);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const tabStripRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const dragState = useRef<{ startX: number; startScrollLeft: number } | null>(null);
    const hasDraggedRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);
    const estimatePanelRef = useRef<HTMLDivElement>(null);
    const [canStick, setCanStick] = useState(true);

    function setAnswer(questionId: string, value: AnswerValue) {
        setAnswers((previous) => ({ ...previous, [questionId]: value }));
    }

    const visibleSteps = steps.filter((step) => isStepVisible(step, answers));
    const foundIndex = visibleSteps.findIndex((step) => step.id === currentStepId);
    const currentIndex = foundIndex === -1 ? 0 : foundIndex;
    const currentStep = visibleSteps[currentIndex];

    const progress = getQuestionnaireProgress(steps, answers);
    const progressPercent = progress.total === 0 ? 0 : Math.round((progress.answered / progress.total) * 100);

    const result = calculateEstimate(steps, answers);
    const projectTypeLabel = getProjectTypeLabel(answers);

    function goTo(index: number) {
        const step = visibleSteps[index];
        if (step) setCurrentStepId(step.id);
    }

    function handleTabClick(index: number) {
        // A drag ending on top of a tab still fires a click — swallow that one
        // click so dragging past a tab doesn't also jump to it.
        if (hasDraggedRef.current) {
            hasDraggedRef.current = false;
            return;
        }
        goTo(index);
    }

    function handleStripMouseDown(event: React.MouseEvent) {
        const strip = tabStripRef.current;
        if (!strip || event.button !== 0) return;
        dragState.current = { startX: event.clientX, startScrollLeft: strip.scrollLeft };
        hasDraggedRef.current = false;
        setIsDragging(true);
    }

    useEffect(() => {
        if (!isDragging) return;

        const DRAG_THRESHOLD_PX = 5;

        function handleMouseMove(event: MouseEvent) {
            const strip = tabStripRef.current;
            if (!strip || !dragState.current) return;
            const delta = event.clientX - dragState.current.startX;
            if (Math.abs(delta) > DRAG_THRESHOLD_PX) hasDraggedRef.current = true;
            strip.scrollLeft = dragState.current.startScrollLeft - delta;
        }

        function handleMouseUp() {
            dragState.current = null;
            setIsDragging(false);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        tabRefs.current[currentStepId]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [currentStepId]);

    useEffect(() => {
        const strip = tabStripRef.current;
        if (!strip) return;

        function updateScrollButtons() {
            if (!strip) return;
            setCanScrollLeft(strip.scrollLeft > 0);
            setCanScrollRight(strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1);
        }

        updateScrollButtons();
        strip.addEventListener("scroll", updateScrollButtons, { passive: true });
        window.addEventListener("resize", updateScrollButtons);
        return () => {
            strip.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [visibleSteps.length]);

    // Only stick the estimate panel while it's short enough to fit the viewport —
    // a sticky panel taller than the screen would clip its own bottom instead of
    // just scrolling normally with the page.
    useEffect(() => {
        const panel = estimatePanelRef.current;
        if (!panel) return;

        const STICKY_OFFSET_PX = 32;

        function updateCanStick() {
            if (!panel) return;
            setCanStick(panel.offsetHeight <= window.innerHeight - STICKY_OFFSET_PX);
        }

        updateCanStick();

        const resizeObserver = new ResizeObserver(updateCanStick);
        resizeObserver.observe(panel);
        window.addEventListener("resize", updateCanStick);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateCanStick);
        };
    }, []);

    function scrollTabs(direction: "left" | "right") {
        tabStripRef.current?.scrollBy({ left: direction === "left" ? -240 : 240, behavior: "smooth" });
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0 rounded-card border border-border bg-surface p-6 shadow-sm">
                <div className="-mx-6 -mt-6 rounded-t-card bg-surface px-6 pb-3 pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <p className="text-sm font-semibold text-foreground">
                            Step {currentIndex + 1} of {visibleSteps.length}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">{progressPercent}% complete</p>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <div className="relative -mx-6 border-b border-border">
                    <div
                        ref={tabStripRef}
                        onMouseDown={handleStripMouseDown}
                        className={`flex select-none gap-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                            isDragging ? "cursor-grabbing" : "cursor-grab"
                        }`}
                    >
                        {visibleSteps.map((step, index) => {
                            const isActiveTab = index === currentIndex;
                            const status = getStepStatus(step, answers, isActiveTab);

                            return (
                                <button
                                    key={step.id}
                                    ref={(el) => {
                                        tabRefs.current[step.id] = el;
                                    }}
                                    type="button"
                                    onClick={() => handleTabClick(index)}
                                    className={`shrink-0 cursor-pointer whitespace-nowrap border-b-2 py-3 text-left text-sm font-medium ${
                                        isActiveTab
                                            ? "border-primary text-foreground"
                                            : status === "not-started"
                                              ? "border-transparent text-muted-foreground"
                                              : "border-transparent text-foreground"
                                    }`}
                                >
                                    <span>
                                        <span className="mr-1.5 text-xs font-semibold text-muted-foreground">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {step.title}
                                    </span>
                                    <span
                                        className={`flex items-center gap-1 text-xs font-normal ${
                                            status === "completed"
                                                ? "text-success"
                                                : status === "in-progress"
                                                  ? "text-primary"
                                                  : "text-muted-foreground"
                                        }`}
                                    >
                                        {status === "completed" && <CompletedIcon />}
                                        {status === "completed"
                                            ? "Completed"
                                            : status === "in-progress"
                                              ? "In progress"
                                              : "Not started"}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {canScrollLeft && (
                        <>
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface to-transparent" />
                            <button
                                type="button"
                                onClick={() => scrollTabs("left")}
                                aria-label="Scroll tabs left"
                                className="absolute left-6 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                    <path
                                        d="M12.5 15L7.5 10L12.5 5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    )}

                    {canScrollRight && (
                        <>
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent" />
                            <button
                                type="button"
                                onClick={() => scrollTabs("right")}
                                aria-label="Scroll tabs right"
                                className="absolute right-6 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                    <path
                                        d="M7.5 5L12.5 10L7.5 15"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {currentStep && (
                    <>
                        <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                            {currentStep.title}
                        </h2>

                        <div className="mt-6 space-y-6">
                            {currentStep.questions.map((question) => {
                                if (!isVisible(question, answers)) return null;

                                return (
                                    <QuestionField
                                        key={question.id}
                                        question={question}
                                        value={answers[question.id]}
                                        onChange={(value) => setAnswer(question.id, value)}
                                    />
                                );
                            })}
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                            <button
                                type="button"
                                disabled={currentIndex === 0}
                                onClick={() => goTo(currentIndex - 1)}
                                className="rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-40"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    currentIndex === visibleSteps.length - 1
                                        ? estimatePanelRef.current?.scrollIntoView({ behavior: "smooth" })
                                        : goTo(currentIndex + 1)
                                }
                                className="rounded-control bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
                            >
                                {currentIndex === visibleSteps.length - 1 ? "View estimate" : "Continue"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div
                ref={estimatePanelRef}
                className={`h-fit space-y-4 rounded-card border border-border bg-surface p-6 shadow-sm ${
                    canStick ? "lg:sticky lg:top-4" : ""
                }`}
            >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Preliminary estimate
                </p>

                {result.status === "stop" ? (
                    <div className="rounded-control border border-warning/30 bg-warning-subtle p-3 text-sm text-warning">
                        This project needs a custom estimate: {result.message}. Please reach out directly.
                    </div>
                ) : (
                    <>
                        <div>
                            {projectTypeLabel && (
                                <p className="text-sm font-medium text-foreground">
                                    {getScopeDescriptor(projectTypeLabel, result.estimate.totalHours)}
                                </p>
                            )}
                            <p className="text-3xl font-bold tracking-tight text-foreground">
                                {formatRange(result.estimate.totalHours)}
                            </p>
                            <p className="text-xs text-muted-foreground">Based on what&apos;s answered so far.</p>
                        </div>

                        <label className="flex items-center justify-between gap-2 text-sm text-foreground">
                            <span>Hourly rate (optional)</span>
                            <input
                                type="number"
                                min={0}
                                value={hourlyRate}
                                onChange={(event) =>
                                    setHourlyRate(event.target.value === "" ? "" : Number(event.target.value))
                                }
                                className="w-24 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                            />
                        </label>

                        {hourlyRate !== "" && hourlyRate > 0 && (
                            <div>
                                <p className="text-sm text-muted-foreground">Estimated cost</p>
                                <p className="text-2xl font-bold tracking-tight text-foreground">
                                    {formatCostRange(applyHourlyRate(result.estimate.totalHours, hourlyRate))}
                                </p>
                            </div>
                        )}

                        <div className="border-t border-border pt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Scope confidence:</span>
                                <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                                    {result.estimate.confidenceLevel}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    (risk reserve {Math.round(result.estimate.riskReservePercent)}%)
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Reflects how well-defined your answers are, not a guarantee of the hour range&apos;s
                                accuracy.
                            </p>
                        </div>

                        {result.estimate.discoveryRecommendation && (
                            <div className="rounded-control border border-warning/30 bg-warning-subtle p-3 text-sm text-warning">
                                {result.estimate.discoveryRecommendation.message}
                            </div>
                        )}

                        <div className="divide-y divide-border rounded-control border border-border text-sm">
                            {result.estimate.workstreamBreakdown.map((item) => (
                                <div key={item.id} className="flex justify-between px-3 py-2">
                                    <span className="text-foreground">{item.label}</span>
                                    <span className="text-muted-foreground">{formatRange(item.hours)}</span>
                                </div>
                            ))}
                        </div>

                        <details className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                                <span>Assumptions ({result.estimate.assumptions.length})</span>
                                <span className="text-xs font-normal text-muted-foreground group-open:hidden">
                                    View assumptions ▸
                                </span>
                                <span className="hidden text-xs font-normal text-muted-foreground group-open:inline">
                                    Hide ▾
                                </span>
                            </summary>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                {result.estimate.assumptions.map((assumption) => (
                                    <li key={assumption}>{assumption}</li>
                                ))}
                            </ul>
                        </details>
                    </>
                )}
            </div>
        </div>
    );
}
