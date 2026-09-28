// Real output from Scenario A in scripts/scenarios.ts — re-run that script after
// touching calculator.ts/questions.ts and update these numbers if they drift.
const breakdown = [
    { label: "Frontend", hours: "97–135h" },
    { label: "CMS & data", hours: "11–19h" },
    { label: "Functionality", hours: "4–8h" },
    { label: "Integrations", hours: "3–6h" },
    { label: "SEO, analytics & quality", hours: "11–17h" },
    { label: "QA & fixes", hours: "32–46h" },
    { label: "PM & communication", hours: "16–24h" },
    { label: "Deployment", hours: "4–8h" },
    { label: "Documentation", hours: "2–6h" },
    { label: "Risk reserve", hours: "19–28h" },
];

export default function ExampleEstimate() {
    return (
        <section className="border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">
                            Example estimate
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                            A real result, not a mockup
                        </h2>
                        <p className="mt-3 max-w-md text-muted-foreground">
                            A corporate website with a custom ACF build, 13 blocks, a CPT, and one integration —
                            final design and requirements ready.
                        </p>
                    </div>
                    <a
                        href="#calculator"
                        className="rounded-control border border-border px-4 py-2 text-sm font-medium text-foreground"
                    >
                        Try your own estimate
                    </a>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <div className="h-fit rounded-card border border-border bg-surface p-6 shadow-sm">
                        <p className="text-sm font-medium text-foreground">Corporate website</p>
                        <p className="mt-1 text-4xl font-bold tracking-tight text-foreground">200–298h</p>
                        <p className="mt-1 text-sm text-muted-foreground">at $100/h: $20,000–$29,800</p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Scope confidence:</span>
                            <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                                high
                            </span>
                        </div>
                    </div>

                    <div className="divide-y divide-border rounded-card border border-border bg-surface text-sm">
                        {breakdown.map((item) => (
                            <div key={item.label} className="flex justify-between px-4 py-3">
                                <span className="text-foreground">{item.label}</span>
                                <span className="text-muted-foreground">{item.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
