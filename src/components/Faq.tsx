const faqs = [
    {
        question: "How accurate is the estimate?",
        answer: "It's a starting point, not a fixed quote. The numbers are based on general assumptions and should be refined once the exact scope is known.",
    },
    {
        question: "Who is this tool for?",
        answer: "Freelancers, agencies, and WordPress site owners who want a rough sense of development hours and cost before starting a project.",
    },
    {
        question: "What is included in the estimate?",
        answer: "Development hours, a QA and fixes allowance, PM and communication time, a deployment estimate, and a risk reserve.",
    },
    {
        question: "Does it include hosting and plugin licenses?",
        answer: "No. Hosting, domains, and plugin licenses are not included in the estimate.",
    },
    {
        question: "Do I need to create an account?",
        answer: "No signup is required. The tool is free to use and your answers stay in your browser session.",
    },
];

export default function Faq() {
    return (
        <section className="border-t border-border py-16">
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

                <div className="mt-10 space-y-3">
                    {faqs.map((faq, index) => (
                        <details
                            key={faq.question}
                            open={index === 0}
                            className="rounded-card border border-border bg-surface p-4"
                        >
                            <summary className="cursor-pointer text-sm font-medium text-foreground">
                                {faq.question}
                            </summary>
                            <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
