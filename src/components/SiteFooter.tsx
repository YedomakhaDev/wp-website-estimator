export default function SiteFooter() {
    return (
        <footer className="mt-auto border-t border-border">
            <div className="mx-auto max-w-content px-6 py-8">
                <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-sm bg-primary" />
                    <span className="text-sm font-bold text-foreground">WP Estimate</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Smarter scoping for WordPress projects.
                </p>
            </div>
        </footer>
    );
}
