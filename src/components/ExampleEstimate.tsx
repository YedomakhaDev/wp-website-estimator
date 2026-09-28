// Real output from Scenario A in scripts/scenarios.ts — re-run that script after
// touching calculator.ts/questions.ts and update these numbers if they drift.
// The headline total (200–298h) is the engine's actual sum, not a re-sum of the
// rows below — independently rounded rows can be off by ~1h from the total,
// same as the live product, so we don't force them to match artificially.

type BreakdownItem = { label: string; min: number; max: number };

const development: BreakdownItem[] = [
    { label: "Frontend", min: 97, max: 135 },
    { label: "CMS & data", min: 11, max: 19 },
    { label: "Functionality", min: 4, max: 8 },
    { label: "Integrations", min: 3, max: 6 },
    { label: "SEO, analytics & quality", min: 11, max: 17 },
];

const allowances: BreakdownItem[] = [
    { label: "QA & fixes", min: 32, max: 46 },
    { label: "PM & communication", min: 16, max: 24 },
    { label: "Deployment", min: 4, max: 8 },
    { label: "Documentation", min: 2, max: 6 },
    { label: "Risk reserve", min: 19, max: 28 },
];

const chips = ["Corporate website", "Custom design", "ACF build", "1 integration"];

const maxMidpoint = Math.max(...[...development, ...allowances].map((item) => (item.min + item.max) / 2));

function BreakdownRow({ item, tone }: { item: BreakdownItem; tone: "primary" | "muted" }) {
    const midpoint = (item.min + item.max) / 2;
    const percent = Math.round((midpoint / maxMidpoint) * 100);

    return (
        <div className="flex items-center gap-3 py-1.5">
            <span className="w-36 shrink-0 text-sm text-foreground">{item.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div
                    className={`h-full rounded-full ${tone === "primary" ? "bg-primary" : "bg-muted-foreground/50"}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="w-16 shrink-0 text-right text-sm text-muted-foreground">
                {item.min}–{item.max}h
            </span>
        </div>
    );
}

export default function ExampleEstimate() {
    return (
        <section id="example" className="scroll-mt-20 border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <p className="text-sm font-medium uppercase tracking-wide text-primary">Example estimate</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    See what a complete estimate looks like
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                    Example: a custom corporate WordPress site with a custom ACF build and one integration.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                        <span
                            key={chip}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <div className="h-fit rounded-card border border-border bg-surface p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Estimated effort
                        </p>
                        <p className="mt-2 text-5xl font-bold tracking-tight text-foreground">200–298h</p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">$20,000–$29,800</p>
                        <p className="text-xs text-muted-foreground">at $100/h</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                            <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                                High confidence
                            </span>
                            <span className="text-xs text-muted-foreground">Risk reserve 11%</span>
                        </div>
                    </div>

                    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Workstream breakdown
                        </p>

                        <p className="mt-4 text-sm font-semibold text-foreground">Development</p>
                        <div className="mt-2">
                            {development.map((item) => (
                                <BreakdownRow key={item.label} item={item} tone="primary" />
                            ))}
                        </div>

                        <p className="mt-5 text-sm font-semibold text-foreground">Project allowances</p>
                        <div className="mt-2">
                            {allowances.map((item) => (
                                <BreakdownRow key={item.label} item={item} tone="muted" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="#calculator"
                        className="inline-block rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground"
                    >
                        Try your own estimate
                    </a>
                </div>
            </div>
        </section>
    );
}
