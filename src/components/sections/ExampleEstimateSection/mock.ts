// Real output from Scenario A in scripts/scenarios.ts — re-run that script after
// touching calculator.ts/questions.ts and update these numbers if they drift.
// The headline total (200–298h) is the engine's actual sum, not a re-sum of the
// rows below — independently rounded rows can be off by ~1h from the total,
// same as the live product, so we don't force them to match artificially.

export type BreakdownItem = { label: string; min: number; max: number };

export const development: BreakdownItem[] = [
    { label: "Frontend", min: 97, max: 135 },
    { label: "CMS & data", min: 11, max: 19 },
    { label: "Functionality", min: 4, max: 8 },
    { label: "Integrations", min: 3, max: 6 },
    { label: "SEO, analytics & quality", min: 11, max: 17 },
];

export const allowances: BreakdownItem[] = [
    { label: "QA & fixes", min: 32, max: 46 },
    { label: "PM & communication", min: 16, max: 24 },
    { label: "Deployment", min: 4, max: 8 },
    { label: "Documentation", min: 2, max: 6 },
    { label: "Risk reserve", min: 19, max: 28 },
];

export const chips = ["Corporate website", "Custom design", "ACF build", "1 integration"];
