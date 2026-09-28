const badges = [
    {
        title: "Built for real WordPress scope",
        description: "Covers custom themes, Gutenberg/ACF, WooCommerce, integrations and more.",
    },
    {
        title: "Deterministic estimation logic",
        description: "Structured rules, not AI — identical answers always give the same result.",
    },
    {
        title: "Transparent breakdown",
        description: "See exactly where every part of the estimate comes from.",
    },
];

function BadgeIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
            <path
                d="M4 10.5L8 14.5L16 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Hero() {
    return (
        <section className="pt-16 pb-10">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
                WordPress project estimator for developers
            </p>
            <h1 className="mt-2 max-w-2xl text-5xl font-bold tracking-tight text-foreground">
                Scope the work. Understand the cost.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Scope the project step by step and get an hours range, workstream breakdown, QA/PM allowances, a
                risk reserve and the assumptions behind it.
            </p>
            <div className="mt-6 flex items-center gap-4">
                <a
                    href="#calculator"
                    className="inline-block rounded-control bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                >
                    Start estimate
                </a>
                <span className="text-xs text-muted-foreground/70">No account required.</span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {badges.map((badge) => (
                    <div key={badge.title} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                            <BadgeIcon />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{badge.title}</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">{badge.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
