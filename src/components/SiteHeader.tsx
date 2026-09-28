"use client";

import { useEffect, useState } from "react";

// Header stays hidden until you scroll up (or reach the very top), so it
// doesn't block content while reading down the page.
const HIDE_AFTER_PX = 80;

export default function SiteHeader() {
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
            <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-sm bg-primary" />
                    <span className="text-sm font-bold text-foreground">WP Estimate</span>
                </div>

                <a
                    href="#calculator"
                    className="rounded-control bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                >
                    Start estimate
                </a>
            </div>
        </header>
    );
}
