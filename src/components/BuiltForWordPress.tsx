const capabilities = [
    { title: "Custom themes & design systems", description: "Page builders, child themes, or fully custom builds." },
    { title: "Gutenberg / ACF blocks", description: "Native blocks, ACF blocks, and flexible content." },
    { title: "CPT & taxonomies", description: "Custom post types, relations, and admin customization." },
    { title: "Search & filtering", description: "From standard search to Algolia and dependent filters." },
    { title: "WooCommerce & eCommerce", description: "Variable products, checkout, payments, shipping." },
    { title: "User accounts & membership", description: "Login, personal accounts, role-based portals." },
    { title: "Integrations", description: "Plugin-based, one-way, and two-way API integrations." },
    { title: "Multilingual", description: "Multiple languages and RTL support." },
    { title: "Content migration & import", description: "Manual, automated, and messy-data imports." },
    { title: "SEO, analytics & performance", description: "Schema, custom events, Core Web Vitals, accessibility." },
];

function CapabilityIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0">
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function BuiltForWordPress() {
    return (
        <section id="included" className="scroll-mt-20 border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                    What it covers
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                    Built for real WordPress scope
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
                    Covers the technical areas that matter in modern WordPress projects.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((capability) => (
                        <div
                            key={capability.title}
                            className="rounded-control border border-border bg-surface p-5"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-subtle text-primary">
                                <CapabilityIcon />
                            </span>
                            <p className="mt-3 text-sm font-semibold text-foreground">{capability.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{capability.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
