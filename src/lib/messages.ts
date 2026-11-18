// User-facing English copy produced by the estimate engine. Kept out of the
// calculation logic so wording (and a future translation) lives in one place,
// and calculator.ts stays pure calculation. Label-derived assumptions
// (`${question.label}: ${option.label}`) are not here — their text already
// comes from the questionnaire data in questions.ts.

export const ASSUMPTIONS = {
    baseThemeSetup: "Frontend — Base theme setup (header, footer, nav, base styles): included",
    wooBaseTemplates: "WooCommerce — base store templates: included",
    bookingBaseEngine: "Booking — base booking engine: included",
    optionsPage: "CMS & data — Options page: included (CPT or ACF present)",
    poorApiDocs: "Integrations — API docs are poor or unknown: +50% on API integrations, plus a discovery spike",
} as const;

export const DISCOVERY_MESSAGES = {
    both: "Requirements aren't settled and the project is technically complex — recommend a paid discovery phase before committing to a fixed estimate.",
    readiness:
        "Requirements, design or content aren't ready yet — recommend a paid discovery phase to reduce uncertainty before committing to a fixed estimate.",
    execution:
        "This project has unusually high technical complexity — recommend a paid discovery phase to de-risk the estimate before committing to a fixed scope.",
} as const;
