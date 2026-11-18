import { Checkbox } from "@/components/base/Checkbox";
import { Input } from "@/components/base/Input";
import { Radio } from "@/components/base/Radio";
import type { AnswerValue, Question } from "@/lib/types";

interface QuestionFieldProps {
    question: Question;
    value: AnswerValue | undefined;
    onChange: (value: AnswerValue) => void;
}

export function QuestionField({ question, value, onChange }: QuestionFieldProps) {
    const optionsContainerClass = "mt-2 grid gap-2 sm:grid-cols-2";

    return (
        <fieldset className="border-0 p-0">
            <legend className="text-sm font-medium text-foreground">{question.label}</legend>

            <div className={optionsContainerClass}>
                {question.type === "single-choice" &&
                    question.options.map((option) => (
                        <Radio
                            key={option.value}
                            name={question.id}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            label={option.label}
                        />
                    ))}

                {question.type === "multi-choice" &&
                    question.options.map((option) => {
                        const selected = Array.isArray(value) ? value : [];
                        const isChecked = selected.includes(option.value);

                        return (
                            <Checkbox
                                key={option.value}
                                checked={isChecked}
                                onChange={() => {
                                    const nextValue = isChecked
                                        ? selected.filter((item) => item !== option.value)
                                        : [...selected, option.value];
                                    onChange(nextValue);
                                }}
                                label={option.label}
                            />
                        );
                    })}

                {question.type === "quantity" &&
                    question.fields.map((field) => {
                        const quantities = value && typeof value === "object" && !Array.isArray(value) ? value : {};
                        const fieldValue = quantities[field.id] ?? 0;

                        return (
                            <label
                                key={field.id}
                                className="flex items-center justify-between gap-2 rounded-control border border-border px-3 py-2 text-sm text-foreground"
                            >
                                <span>{field.label}</span>
                                <Input
                                    type="number"
                                    min={0}
                                    value={fieldValue}
                                    onChange={(event) =>
                                        onChange({ ...quantities, [field.id]: Math.max(0, Number(event.target.value)) })
                                    }
                                    className="w-24"
                                />
                            </label>
                        );
                    })}
            </div>
        </fieldset>
    );
}
