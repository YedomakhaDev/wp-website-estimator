import { isStepComplete, isStepStarted } from "@/lib/calculator";
import { steps } from "@/lib/questions";
import type { AnswerMap, HourRange, Step, WorkstreamHours } from "@/lib/types";

import type { StepStatus } from "./types";

export function formatRange(range: HourRange): string {
    if (range.min === range.max) return `${Math.round(range.min)}h`;
    return `${Math.round(range.min)}–${Math.round(range.max)}h`;
}

export function formatCostRange(range: HourRange): string {
    const format = (value: number) => Math.round(value).toLocaleString();
    if (range.min === range.max) return `$${format(range.min)}`;
    return `$${format(range.min)}–${format(range.max)}`;
}

// A step counts as "in progress" once it's either the one currently open, or
// has at least one answer already — so filling something in and switching
// tabs doesn't make it look untouched again.
export function getStepStatus(step: Step, answers: AnswerMap, isCurrent: boolean): StepStatus {
    if (isStepComplete(step, answers)) return "completed";
    if (isCurrent || isStepStarted(step, answers)) return "in-progress";
    return "not-started";
}

export function getProjectTypeLabel(answers: AnswerMap): string | null {
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
export function getScopeDescriptor(projectTypeLabel: string, totalHours: HourRange): string {
    const midpoint = (totalHours.min + totalHours.max) / 2;
    const label = projectTypeLabel.toLowerCase();

    if (midpoint < 200) return `Simple ${label}`;
    if (midpoint < 600) return projectTypeLabel;
    if (midpoint < 1200) return `Large ${label}`;
    return `Highly complex ${label}`;
}

// Split the workstream breakdown into the two displayed groups, dropping rows
// that come out to zero hours so empty buckets don't clutter the result.
export function splitBreakdown(breakdown: WorkstreamHours[]) {
    const nonZero = (item: WorkstreamHours) => item.hours.min > 0 || item.hours.max > 0;
    return {
        development: breakdown.filter((item) => item.group === "development" && nonZero(item)),
        allowances: breakdown.filter((item) => item.group === "allowances" && nonZero(item)),
    };
}
