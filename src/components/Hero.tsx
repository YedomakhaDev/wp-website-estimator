export default function Hero() {
    return (
        <section className="pt-16 pb-10">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
                WordPress Project Estimator
            </p>
            <h1 className="mt-2 max-w-2xl text-5xl font-bold tracking-tight text-foreground">
                Scope the work. Understand the cost.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Answer a few questions and get a clear range of development hours
                and cost for your WordPress project.
            </p>
            <a
                href="#calculator"
                className="mt-8 inline-block rounded-control bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
                Start estimate
            </a>
        </section>
    );
}
