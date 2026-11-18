import Link from "next/link";

import { CheckIcon } from "@/assets/icons/CheckIcon";
import { Button } from "@/components/base/Button";
import { Eyebrow } from "@/components/base/Eyebrow";

import { badges } from "./mock";

export function HeroSection() {
    return (
        <section className="pt-16 pb-10">
            <Eyebrow>WordPress project estimator for developers</Eyebrow>
            <h1 className="mt-2 max-w-2xl text-5xl font-bold tracking-tight text-foreground">
                Scope the work. Understand the cost.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Scope the project step by step and get an hours range, workstream breakdown, QA/PM allowances, a risk
                reserve and the assumptions behind it.
            </p>
            <div className="mt-6 flex items-center gap-4">
                <Button asChild size="lg">
                    <Link href="#calculator">Start estimate</Link>
                </Button>
                <span className="text-xs text-muted-foreground/70">No account required.</span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {badges.map((badge) => (
                    <div key={badge.title} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
                            <CheckIcon className="h-4 w-4 shrink-0" />
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
