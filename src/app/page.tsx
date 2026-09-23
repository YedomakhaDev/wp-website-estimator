import Calculator from "@/components/Calculator";

export default function Home() {
    return (
        <div className="min-h-full">
            <main className="mx-auto max-w-content px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    WordPress Project Estimator
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                    Answer a few questions and get a development estimate for your
                    WordPress project.
                </p>
                <div id="calculator" className="mt-10">
                    <Calculator />
                </div>
            </main>
        </div>
    );
}
