const faqs = [
    {
        question: "How are the hours calculated?",
        answer: "Each answer adds base hours to a workstream (frontend, CMS, functionality, integrations and more), then QA, PM, deployment, and documentation allowances are added on top, scaled to the project.",
    },
    {
        question: "What does scope confidence mean?",
        answer: "It reflects how well-defined your answers are — clear design, content, and requirements raise it; vague or changeable ones lower it. It's not a measure of how accurate the hour range is.",
    },
    {
        question: "How is the risk reserve calculated?",
        answer: "It combines two factors: how ready the inputs are (design, content, requirements) and how complex the technical scope is (integrations, custom logic, edge cases).",
    },
    {
        question: "Should I use this estimate as a fixed quote?",
        answer: "No. It's a starting point for scoping and discussion, not a fixed quote. Refine it once the exact requirements are locked in.",
    },
    {
        question: "Does the tool store project data?",
        answer: "No. There's no backend, database, or account — your answers only exist in this browser tab and are never sent anywhere.",
    },
];

export default function Faq() {
    return (
        <section id="faq" className="scroll-mt-20 border-t border-border py-16">
            <div className="mx-auto max-w-content px-6">
                <p className="text-center text-sm font-medium uppercase tracking-wide text-primary">
                    FAQ
                </p>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                    Frequently asked questions
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
                    Everything you need to know about the estimator.
                </p>

                <div className="mx-auto mt-10 max-w-2xl space-y-3">
                    {faqs.map((faq, index) => (
                        <details
                            key={faq.question}
                            open={index === 0}
                            className="group rounded-card border border-border bg-surface p-5"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground">
                                {faq.question}
                                <span className="shrink-0 text-lg text-muted-foreground group-open:hidden">+</span>
                                <span className="hidden shrink-0 text-lg text-muted-foreground group-open:inline">
                                    −
                                </span>
                            </summary>
                            <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
