import { Eyebrow } from "@/components/base/Eyebrow";
import { Container } from "@/common/Container";

import { faqs } from "./mock";

export function FaqSection() {
    return (
        <section id="faq" className="scroll-mt-20 border-t border-border py-16">
            <Container>
                <Eyebrow className="text-center">FAQ</Eyebrow>
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
            </Container>
        </section>
    );
}
