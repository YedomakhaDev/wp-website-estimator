import BuiltForWordPress from "@/components/BuiltForWordPress";
import Calculator from "@/components/Calculator";
import ExampleEstimate from "@/components/ExampleEstimate";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";

export default function Home() {
    return (
        <div className="min-h-full">
            <main className="mx-auto max-w-content px-6">
                <Hero />
                <div id="calculator" className="pb-16">
                    <Calculator />
                </div>
            </main>

            <Methodology />
            <BuiltForWordPress />
            <ExampleEstimate />
            <Faq />
        </div>
    );
}
