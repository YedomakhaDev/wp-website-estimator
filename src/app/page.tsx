import { BuiltForWordPressSection } from "@/components/sections/BuiltForWordPressSection";
import { EstimatorSection } from "@/components/sections/EstimatorSection";
import { ExampleEstimateSection } from "@/components/sections/ExampleEstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { Container } from "@/common/Container";

export default function Home() {
    return (
        <main className="min-h-full">
            <Container>
                <HeroSection />
                <div id="calculator" className="pb-16">
                    <EstimatorSection />
                </div>
            </Container>

            <MethodologySection />
            <BuiltForWordPressSection />
            <ExampleEstimateSection />
            <FaqSection />
        </main>
    );
}
