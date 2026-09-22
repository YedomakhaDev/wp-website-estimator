import { Question } from "./types";

export const questions: Question[] = [
    {
        id: "site_type",
        label: "What type of website do you need?",
        type: "single-choice",
        options: [
            { value: "brochure", label: "Brochure / business site" },
            { value: "blog", label: "Blog" },
            { value: "store", label: "Online store" },
            { value: "custom_app", label: "Custom web application" },
        ],
    },
];
