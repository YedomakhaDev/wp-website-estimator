export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-10 border-b border-border bg-surface">
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
