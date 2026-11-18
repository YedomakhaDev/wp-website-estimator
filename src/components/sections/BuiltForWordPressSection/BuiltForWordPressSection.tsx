import { BlockIcon } from "@/assets/icons/BlockIcon";
import { Eyebrow } from "@/components/base/Eyebrow";
import { Container } from "@/common/Container";

import { capabilities } from "./mock";

export function BuiltForWordPressSection() {
    return (
        <section id="included" className="scroll-mt-20 border-t border-border py-16">
            <Container>
                <Eyebrow className="text-center">What it covers</Eyebrow>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground">
                    Built for real WordPress scope
                </h2>
                <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
                    Covers the technical areas that matter in modern WordPress projects.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((capability) => (
                        <div key={capability.title} className="rounded-control border border-border bg-surface p-5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-subtle text-primary">
                                <BlockIcon className="h-4 w-4 shrink-0" />
                            </span>
                            <p className="mt-3 text-sm font-semibold text-foreground">{capability.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{capability.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
