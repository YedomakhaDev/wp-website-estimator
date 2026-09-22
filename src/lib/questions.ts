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
    {
        id: "page_count",
        label: "How many unique pages or templates does the site need?",
        type: "number",
    },
    {
        id: "features",
        label: "Which features does the site need?",
        type: "multi-choice",
        options: [
            { value: "contact_form", label: "Contact form" },
            { value: "multilingual", label: "Multilingual content" },
            { value: "crm_integration", label: "CRM integration" },
            { value: "membership_area", label: "Membership / login area" },
        ],
    },
];
