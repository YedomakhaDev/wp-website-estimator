import { blockPriceFor } from "./calculator";
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
    {
        id: "build",
        title: "How we build it",
        questions: [
            {
                id: "build_approach",
                label: "How will we build it?",
                type: "single-choice",
                options: [
                    {
                        value: "page_builder",
                        label: "Page builder (Elementor, Bricks, etc.)",
                        effect: { bucket: "buildSetup", hours: { min: 4, max: 6 } },
                    },
                    {
                        value: "theme_child",
                        label: "Ready-made theme + child theme",
                        effect: { bucket: "buildSetup", hours: { min: 4, max: 8 } },
                    },
                    {
                        value: "custom_acf",
                        label: "Custom theme + ACF",
                        effect: { bucket: "buildSetup", hours: { min: 10, max: 14 } },
                    },
                    {
                        value: "native_gutenberg",
                        label: "Native Gutenberg blocks",
                        effect: { bucket: "buildSetup", hours: { min: 14, max: 20 } },
                    },
                    {
                        value: "headless",
                        label: "Headless WordPress",
                        effect: { stopFlag: true },
                    },
                ],
            },
        ],
    },
    {
        id: "design",
        title: "Design & markup",
        questions: [
            {
                id: "design_complexity",
                label: "Design complexity",
                type: "single-choice",
                options: [
                    { value: "standard", label: "Standard" },
                    { value: "custom", label: "Custom" },
                    { value: "creative", label: "Creative" },
                ],
            },
            {
                id: "unique_blocks",
                label: "Unique blocks / sections",
                type: "quantity",
                fields: [
                    {
                        id: "count",
                        label: "Blocks",
                        bucket: "frontendBlocks",
                        hoursPerUnit: blockPriceFor,
                    },
                ],
            },
            {
                id: "templates",
                label: "Unique templates",
                type: "quantity",
                fields: [
                    {
                        id: "simple",
                        label: "Simple templates",
                        bucket: "frontendTemplates",
                        hoursPerUnit: { min: 2, max: 3 },
                    },
                    {
                        id: "dynamic",
                        label: "Dynamic templates (archive, single, search)",
                        bucket: "frontendTemplates",
                        hoursPerUnit: { min: 4, max: 6 },
                    },
                ],
            },
            {
                id: "header_complexity",
                label: "Header & navigation",
                type: "single-choice",
                options: [
                    { value: "simple", label: "Simple" },
                    {
                        value: "sticky",
                        label: "Sticky, changes on scroll",
                        effect: { bucket: "frontendHeader", hours: { min: 3, max: 5 } },
                    },
                    {
                        value: "mega_menu",
                        label: "Mega menu",
                        effect: { bucket: "frontendHeader", hours: { min: 6, max: 10 } },
                    },
                    {
                        value: "multiple_variants",
                        label: "Multiple header variants",
                        effect: { bucket: "frontendHeader", hours: { min: 4, max: 6 } },
                    },
                ],
            },
            {
                id: "animations_level",
                label: "Animations",
                type: "single-choice",
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "basic",
                        label: "Basic",
                        effect: { bucket: "frontendAnimations", hours: { min: 4, max: 6 } },
                    },
                    {
                        value: "moderate",
                        label: "Moderate",
                        effect: { bucket: "frontendAnimations", hours: { min: 12, max: 18 } },
                    },
                    {
                        value: "advanced",
                        label: "Advanced (GSAP)",
                        effect: { bucket: "frontendAnimations", hours: { min: 30, max: 45 } },
                    },
                    {
                        value: "webgl",
                        label: "WebGL",
                        effect: { stopFlag: true },
                    },
                ],
            },
            {
                id: "pixel_perfect",
                label: "Pixel-perfect implementation",
                type: "single-choice",
                options: [
                    { value: "no", label: "No" },
                    {
                        value: "yes",
                        label: "Yes",
                        effect: { frontendPercent: 0.1, risk: [{ axis: "execution", points: 1 }] },
                    },
                ],
            },
        ],
    },
];
