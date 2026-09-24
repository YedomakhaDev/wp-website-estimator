import { blockPriceFor, isFullCmsBuild } from "./calculator";
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
    {
        id: "cms",
        title: "CMS & data",
        questions: [
            {
                id: "cpt_count",
                label: "Custom Post Types",
                type: "quantity",
                fields: [
                    {
                        id: "count",
                        label: "CPTs",
                        bucket: "cms",
                        hoursPerUnit: { min: 3, max: 5 },
                    },
                ],
            },
            {
                id: "taxonomy_count",
                label: "Taxonomies",
                type: "quantity",
                visibleIf: isFullCmsBuild,
                fields: [
                    {
                        id: "count",
                        label: "Taxonomies",
                        bucket: "cms",
                        hoursPerUnit: { min: 1, max: 1.5 },
                    },
                ],
            },
            {
                id: "relations",
                label: "Relations between entries",
                type: "single-choice",
                visibleIf: isFullCmsBuild,
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "simple",
                        label: "Simple",
                        effect: { bucket: "cms", hours: { min: 2, max: 4 } },
                    },
                    {
                        value: "complex",
                        label: "Complex, many-to-many",
                        effect: {
                            bucket: "cms",
                            hours: { min: 8, max: 14 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                ],
            },
            {
                id: "admin_custom",
                label: "Admin customization",
                type: "single-choice",
                visibleIf: isFullCmsBuild,
                options: [
                    { value: "no", label: "No" },
                    {
                        value: "yes",
                        label: "Yes",
                        effect: { bucket: "cms", hours: { min: 4, max: 8 } },
                    },
                ],
            },
            {
                id: "editor_flexibility",
                label: "Editor freedom",
                type: "single-choice",
                visibleIf: isFullCmsBuild,
                options: [
                    { value: "rigid", label: "Rigid layouts" },
                    { value: "flexible", label: "Flexible" },
                    { value: "full", label: "Full freedom" },
                ],
            },
        ],
    },
    {
        id: "functionality",
        title: "Functionality",
        questions: [
            {
                id: "search_level",
                label: "Search",
                type: "single-choice",
                options: [
                    {
                        value: "standard",
                        label: "Standard WordPress search",
                        effect: { bucket: "functionality", hours: { min: 0, max: 2 } },
                    },
                    {
                        value: "by_cpt_fields",
                        label: "By CPT and custom fields",
                        effect: { bucket: "functionality", hours: { min: 6, max: 10 } },
                    },
                    {
                        value: "ajax_live",
                        label: "AJAX live search",
                        effect: { bucket: "functionality", hours: { min: 12, max: 20 } },
                    },
                    {
                        value: "algolia_es",
                        label: "Algolia / Elasticsearch",
                        effect: {
                            bucket: "functionality",
                            hours: { min: 30, max: 50 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                ],
            },
            {
                id: "filters_level",
                label: "Filters",
                type: "single-choice",
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "simple",
                        label: "Simple",
                        effect: { bucket: "functionality", hours: { min: 8, max: 14 } },
                    },
                    {
                        value: "ajax_url",
                        label: "AJAX + URL state",
                        effect: { bucket: "functionality", hours: { min: 24, max: 36 } },
                    },
                    {
                        value: "dependent_counts",
                        label: "Dependent filters with result counts",
                        effect: {
                            bucket: "functionality",
                            hours: { min: 50, max: 80 },
                            risk: [{ axis: "execution", points: 2 }],
                        },
                    },
                ],
            },
            {
                id: "forms",
                label: "Forms",
                type: "quantity",
                fields: [
                    {
                        id: "simple",
                        label: "Simple forms",
                        bucket: "functionality",
                        hoursPerUnit: { min: 2, max: 3 },
                    },
                    {
                        id: "with_logic",
                        label: "Forms with logic and CRM",
                        bucket: "functionality",
                        hoursPerUnit: { min: 6, max: 9 },
                    },
                    {
                        id: "multi_step",
                        label: "Multi-step forms with upload",
                        bucket: "functionality",
                        hoursPerUnit: { min: 16, max: 24 },
                    },
                ],
            },
            {
                id: "users_level",
                label: "Users",
                type: "single-choice",
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "login_register",
                        label: "Login + registration",
                        effect: { bucket: "functionality", hours: { min: 8, max: 14 } },
                    },
                    {
                        value: "account",
                        label: "Personal account area",
                        effect: {
                            bucket: "functionality",
                            hours: { min: 30, max: 50 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                    {
                        value: "portal_roles",
                        label: "Portal with roles",
                        effect: {
                            bucket: "functionality",
                            hours: { min: 60, max: 100 },
                            risk: [{ axis: "execution", points: 2 }],
                        },
                    },
                ],
            },
        ],
    },
    {
        id: "woocommerce",
        title: "WooCommerce",
        visibleIf: (answers) => answers.project_type === "woocommerce",
        questions: [
            {
                id: "product_types",
                label: "Products",
                type: "single-choice",
                options: [
                    { value: "simple_only", label: "Simple products only" },
                    {
                        value: "has_variable",
                        label: "Includes variable products",
                        effect: { bucket: "woo", hours: { min: 4, max: 8 } },
                    },
                ],
            },
            {
                id: "checkout_level",
                label: "Checkout",
                type: "single-choice",
                options: [
                    { value: "standard", label: "Standard" },
                    {
                        value: "light_custom",
                        label: "Light customization",
                        effect: { bucket: "woo", hours: { min: 6, max: 10 } },
                    },
                    {
                        value: "custom_logic",
                        label: "Custom logic",
                        effect: {
                            bucket: "woo",
                            hours: { min: 20, max: 35 },
                            risk: [{ axis: "execution", points: 2 }],
                        },
                    },
                ],
            },
            {
                id: "payments",
                label: "Payment gateways",
                type: "quantity",
                fields: [
                    {
                        id: "standard",
                        label: "Standard gateways",
                        bucket: "woo",
                        hoursPerUnit: { min: 3, max: 5 },
                    },
                    {
                        id: "local",
                        label: "Local gateways",
                        bucket: "woo",
                        hoursPerUnit: { min: 8, max: 14 },
                    },
                ],
            },
            {
                id: "shipping_level",
                label: "Shipping",
                type: "single-choice",
                options: [
                    {
                        value: "simple",
                        label: "Simple",
                        effect: { bucket: "woo", hours: { min: 3, max: 6 } },
                    },
                    {
                        value: "courier_api",
                        label: "Courier API / table-rate",
                        effect: {
                            bucket: "woo",
                            hours: { min: 16, max: 28 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                ],
            },
            {
                id: "woo_extensions",
                label: "Extensions",
                type: "multi-choice",
                options: [
                    {
                        value: "subscriptions",
                        label: "Subscriptions",
                        effect: { bucket: "woo", hours: { min: 16, max: 35 } },
                    },
                    {
                        value: "b2b",
                        label: "B2B / wholesale",
                        effect: { bucket: "woo", hours: { min: 16, max: 35 } },
                    },
                    {
                        value: "bookings",
                        label: "Bookings",
                        effect: { bucket: "woo", hours: { min: 16, max: 35 } },
                    },
                    {
                        value: "bundles",
                        label: "Bundles",
                        effect: { bucket: "woo", hours: { min: 16, max: 35 } },
                    },
                ],
            },
        ],
    },
    {
        id: "booking",
        title: "Booking",
        visibleIf: (answers) => answers.project_type === "booking",
        questions: [
            {
                id: "booking_resource_type",
                label: "Resource type",
                type: "single-choice",
                options: [
                    { value: "single_slot", label: "One slot type (one specialist/object)" },
                    {
                        value: "multi_resource",
                        label: "Several resources with independent schedules",
                        effect: { bucket: "booking", hours: { min: 10, max: 18 } },
                    },
                    {
                        value: "group_booking",
                        label: "Group bookings (capacity limit per slot)",
                        effect: {
                            bucket: "booking",
                            hours: { min: 14, max: 24 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                ],
            },
            {
                id: "booking_payment",
                label: "Payment at booking time",
                type: "single-choice",
                options: [
                    { value: "no_prepay", label: "No prepayment" },
                    {
                        value: "prepay_deposit",
                        label: "Prepayment or deposit",
                        effect: { bucket: "booking", hours: { min: 6, max: 10 } },
                    },
                ],
            },
            {
                id: "booking_changes",
                label: "Cancellation and rescheduling",
                type: "single-choice",
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "policy",
                        label: "Yes, with a policy (deadlines, penalties)",
                        effect: {
                            bucket: "booking",
                            hours: { min: 6, max: 12 },
                            risk: [{ axis: "execution", points: 1 }],
                        },
                    },
                ],
            },
            {
                id: "booking_notifications",
                label: "Reminders",
                type: "single-choice",
                options: [
                    { value: "none", label: "None" },
                    {
                        value: "email",
                        label: "Email",
                        effect: { bucket: "booking", hours: { min: 3, max: 5 } },
                    },
                    {
                        value: "email_sms",
                        label: "Email + SMS",
                        effect: { bucket: "booking", hours: { min: 8, max: 14 } },
                    },
                ],
            },
        ],
    },
];
