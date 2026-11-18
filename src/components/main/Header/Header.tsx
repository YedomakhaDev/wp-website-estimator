"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/base/Button";
import { Container } from "@/common/Container";

// Header stays hidden until you scroll up (or reach the very top), so it
// doesn't block content while reading down the page.
const HIDE_AFTER_PX = 80;

export function Header() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        function handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;

            if (currentScrollY <= 0) {
                setHidden(false);
            } else if (scrollingDown && currentScrollY > HIDE_AFTER_PX) {
                setHidden(true);
            } else if (!scrollingDown) {
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-10 border-b border-border bg-surface transition-transform duration-300 ${
                hidden ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <Container className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
                <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-sm bg-primary" />
                    <span className="text-sm font-bold text-foreground">WP Estimate</span>
                </div>

                <nav className="hidden items-center justify-center gap-6 text-sm font-medium text-muted-foreground md:flex">
                    <Link href="#methodology" className="hover:text-foreground">
                        Methodology
                    </Link>
                    <Link href="#included" className="hover:text-foreground">
                        What&apos;s included
                    </Link>
                    <Link href="#example" className="hover:text-foreground">
                        Example
                    </Link>
                    <Link href="#faq" className="hover:text-foreground">
                        FAQ
                    </Link>
                </nav>

                <Button asChild size="sm" className="justify-self-end">
                    <Link href="#calculator">Start estimate</Link>
                </Button>
            </Container>
        </header>
    );
}
