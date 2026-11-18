import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Container } from "@/common/Container";

import { steps } from "./mock";

function PipelineArrow() {
    return (
        <span aria-hidden className="ml-2 hidden flex-1 items-center gap-1 text-border lg:flex">
            <span className="h-px flex-1 bg-border" />
            <ChevronRightIcon className="h-3 w-3 shrink-0" />
        </span>
    );
}

export function MethodologySection() {
    return (
        <section id="methodology" className="scroll-mt-20 border-t border-border py-16">
            <Container>
                <Eyebrow className="text-center">Methodology</Eyebrow>
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
            </Container>
        </section>
    );
}
