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

function PipelineArrow() {
    return (
        <span aria-hidden className="ml-2 hidden flex-1 items-center gap-1 text-border lg:flex">
            <span className="h-px flex-1 bg-border" />
            <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3 shrink-0">
                <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

export default function Methodology() {
    return (
        <section id="methodology" className="scroll-mt-20 border-t border-border py-16">
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
                    {steps.map((step, index) => (
                        <div key={step.number}>
                            <div className="flex items-center">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-sm font-semibold text-primary">
                                    {step.number}
                                </span>
                                {index < steps.length - 1 && <PipelineArrow />}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
