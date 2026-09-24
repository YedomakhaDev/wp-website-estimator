import { Step } from "./types";

// Level-mode questionnaire. Steps are added incrementally —
// see _plans/1790251989_level-mode-questionnaire.md for the full plan.
export const steps: Step[] = [
    {
        id: "project",
        title: "Project",
        questions: [
            {
                id: "project_type",
                label: "What type of website is this?",
                type: "single-choice",
                options: [
                    { value: "corporate", label: "Corporate website" },
                    { value: "landing", label: "Landing page" },
                    { value: "blog", label: "Blog / media site" },
                    { value: "catalog", label: "Catalog (no payments)" },
                    { value: "woocommerce", label: "WooCommerce store" },
                    { value: "membership", label: "Membership portal" },
                    { value: "booking", label: "Booking system" },
                    { value: "directory", label: "Directory / listings" },
                    {
                        value: "marketplace",
                        label: "Marketplace (multiple vendors)",
                        effect: { stopFlag: true },
                    },
                    {
                        value: "lms",
                        label: "Learning platform (LMS)",
                        effect: { stopFlag: true },
                    },
                    {
                        value: "multisite",
                        label: "WordPress Multisite network",
                        effect: { stopFlag: true },
                    },
                ],
            },
            {
                id: "project_origin",
                label: "What are we doing?",
                type: "single-choice",
                options: [
                    { value: "new", label: "New website" },
                    { value: "redesign", label: "Redesign, same functionality" },
                    {
                        value: "migration",
                        label: "Migration from another platform",
                        effect: { risk: [{ axis: "execution", points: 1 }] },
                    },
                    {
                        value: "legacy",
                        label: "Working on an existing legacy project",
                        effect: { stopFlag: true },
                    },
                ],
            },
        ],
    },
    {
        id: "readiness",
        title: "Input readiness",
        questions: [
            {
                id: "design_status",
                label: "Design",
                type: "single-choice",
                options: [
                    { value: "final_all", label: "Final design for all pages, desktop + mobile" },
                    {
                        value: "desktop_only",
                        label: "Desktop only",
                        effect: { frontendPercent: 0.15, risk: [{ axis: "readiness", points: 2 }] },
                    },
                    {
                        value: "partial",
                        label: "Partial design",
                        effect: { risk: [{ axis: "readiness", points: 3 }] },
                    },
                    {
                        value: "references_only",
                        label: "No design, references only",
                        effect: { risk: [{ axis: "readiness", points: 4 }] },
                    },
                ],
            },
            {
                id: "specs_status",
                label: "Spec and business logic",
                type: "single-choice",
                options: [
                    { value: "described", label: "Described" },
                    {
                        value: "partial",
                        label: "Partially described",
                        effect: { risk: [{ axis: "readiness", points: 2 }] },
                    },
                    {
                        value: "none",
                        label: "Not described",
                        effect: { risk: [{ axis: "readiness", points: 4 }] },
                    },
                ],
            },
            {
                id: "content_status",
                label: "Content",
                type: "single-choice",
                options: [
                    { value: "final", label: "Final content is ready" },
                    {
                        value: "later",
                        label: "Will be provided later",
                        effect: { risk: [{ axis: "readiness", points: 2 }] },
                    },
                ],
            },
            {
                id: "requirements_stability",
                label: "Requirements stability",
                type: "single-choice",
                options: [
                    { value: "approved", label: "Approved and fixed" },
                    {
                        value: "may_change",
                        label: "May change",
                        effect: { risk: [{ axis: "readiness", points: 2 }] },
                    },
                    {
                        value: "will_change",
                        label: "Will definitely change",
                        effect: { risk: [{ axis: "readiness", points: 4 }] },
                    },
                ],
            },
        ],
    },
];
