import Calculator from "@/components/Calculator";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
    return (
        <div className="min-h-full">
            <main className="mx-auto max-w-content px-6">
                <Hero />
                <div id="calculator" className="pb-16">
                    <Calculator />
                </div>
            </main>

            <HowItWorks />
        </div>
    );
}
