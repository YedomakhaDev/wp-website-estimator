import Link from "next/link";

import { Badge } from "@/components/base/Badge";
import { Button } from "@/components/base/Button";
import { Card } from "@/components/base/Card";
import { Eyebrow } from "@/components/base/Eyebrow";
import { ProgressBar } from "@/components/base/ProgressBar";
import { Container } from "@/common/Container";

import { allowances, type BreakdownItem, chips, development } from "./mock";

const maxMidpoint = Math.max(...[...development, ...allowances].map((item) => (item.min + item.max) / 2));

function BreakdownRow({ item, tone }: { item: BreakdownItem; tone: "primary" | "muted" }) {
    const midpoint = (item.min + item.max) / 2;
    const percent = Math.round((midpoint / maxMidpoint) * 100);

    return (
        <div className="flex items-center gap-3 py-1.5">
            <span className="w-40 shrink-0 text-sm text-foreground">{item.label}</span>
            <ProgressBar
                value={percent}
                className="h-2 flex-1"
                barClassName={tone === "primary" ? undefined : "bg-muted-foreground/50"}
            />
            <span className="w-16 shrink-0 text-right text-sm text-muted-foreground">
                {item.min}–{item.max}h
            </span>
        </div>
    );
}

export function ExampleEstimateSection() {
    return (
        <section id="example" className="scroll-mt-20 border-t border-border py-16">
            <Container>
                <Eyebrow>Example estimate</Eyebrow>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    See what a complete estimate looks like
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                    Example: a custom corporate WordPress site with a custom ACF build and one integration.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                        <Badge key={chip} variant="outline">
                            {chip}
                        </Badge>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <Card className="h-fit">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Estimated effort
                        </p>
                        <p className="mt-2 text-[41px] font-bold tracking-tight text-foreground">200–298h</p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">$20,000–$29,800</p>
                        <p className="text-xs text-muted-foreground">at $100/h</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                            <Badge>High confidence</Badge>
                            <span className="text-xs text-muted-foreground">Risk reserve 11%</span>
                        </div>

                        <Button asChild className="mt-4 w-full">
                            <Link href="#calculator">Try your own estimate</Link>
                        </Button>
                    </Card>

                    <Card>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Workstream breakdown
                        </p>

                        <p className="mt-4 text-sm font-semibold text-foreground">Development</p>
                        <div className="mt-2">
                            {development.map((item) => (
                                <BreakdownRow key={item.label} item={item} tone="primary" />
                            ))}
                        </div>

                        <p className="mt-5 text-sm font-semibold text-foreground">Project allowances</p>
                        <div className="mt-2">
                            {allowances.map((item) => (
                                <BreakdownRow key={item.label} item={item} tone="muted" />
                            ))}
                        </div>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
