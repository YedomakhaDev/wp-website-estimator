const steps = [
    {
        number: "01",
        title: "Scope",
        description:
            "Your answers add base hours to individual workstreams — frontend, CMS, functionality, integrations and more.",
    },
    {
        number: "02",
        title: "Allowances",
        description: "QA & fixes, PM & communication, deployment and documentation are added on top, scaled to the project.",
    },
    {
        number: "03",
        title: "Risk",
        description: "Unclear requirements and technical complexity contribute to a risk reserve and a scope confidence level.",
    },
    {
        number: "04",
        title: "Result",
        description: "You get an hours range, a full workstream breakdown, the assumptions behind it, and an optional cost.",
    },
];

export default function Methodology() {
    return (
        <section className="border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                    Methodology
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                    How the estimate is built
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
                    A structured, deterministic process — no AI, no guesswork.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <div key={step.number}>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-subtle text-sm font-semibold text-primary">
                                {step.number}
                            </span>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
