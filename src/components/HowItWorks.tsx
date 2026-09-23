const steps = [
    {
        number: "01",
        title: "Answer a few questions",
        description: "Tell us about your project: site type, page count, and the features you need.",
    },
    {
        number: "02",
        title: "We calculate the estimate",
        description: "Your answers are turned into an hours and cost range using our estimation rules.",
    },
    {
        number: "03",
        title: "Review your results",
        description: "Get a breakdown of hours, an estimated cost, and the assumptions behind it.",
    },
];

export default function HowItWorks() {
    return (
        <section className="border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                    How it works
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                    From answers to a clearer estimate
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
                    A simple three-step process to turn your project details into an estimate.
                </p>

                <div className="mt-12 grid gap-8 sm:grid-cols-3">
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
