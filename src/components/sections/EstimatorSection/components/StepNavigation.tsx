import { Button } from "@/components/base/Button";

interface StepNavigationProps {
    isFirst: boolean;
    isLast: boolean;
    onBack: () => void;
    onContinue: () => void;
}

export function StepNavigation({ isFirst, isLast, onBack, onContinue }: StepNavigationProps) {
    return (
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button type="button" variant="secondary" disabled={isFirst} onClick={onBack}>
                Back
            </Button>
            <Button type="button" onClick={onContinue}>
                {isLast ? "View estimate" : "Continue"}
            </Button>
        </div>
    );
}
