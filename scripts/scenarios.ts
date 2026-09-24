// Calibration regression check. Run with: npx tsx scripts/scenarios.ts
//
// Fixed answer sets spanning most project types, plus one deliberately
// maxed-out stress test and one stop-flag case, with the estimates they
// produced when this file was written. When tuning coefficients later,
// re-run this and compare — a "normal" scenario drifting wildly, or the
// stress test suddenly looking tame, is a signal.
import { calculateEstimate } from "../src/lib/calculator";
import { steps } from "../src/lib/questions";
import { AnswerMap } from "../src/lib/types";

type Scenario = { name: string; answers: AnswerMap };

const scenarioA_cleanCorporate: Scenario = {
    name: "A. Corporate, clean inputs (expect ~248h, high confidence, ~10% reserve)",
    answers: {
        project_type: "corporate",
        project_origin: "new",
        design_status: "final_all",
        specs_status: "described",
        content_status: "final",
        requirements_stability: "approved",
        build_approach: "custom_acf",
        design_complexity: "custom",
        unique_blocks: { count: 13 },
        templates: { simple: 4, dynamic: 2 },
        header_complexity: "sticky",
        animations_level: "basic",
        pixel_perfect: "no",
        cpt_count: { count: 2 },
        taxonomy_count: { count: 1 },
        relations: "simple",
        admin_custom: "no",
        editor_flexibility: "flexible",
        search_level: "standard",
        filters_level: "none",
        forms: { simple: 2, with_logic: 0, multi_step: 0 },
        users_level: "none",
        integrations: { plugin: 1, one_way: 0, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "client",
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        cookie_consent: "yes",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "ssh_git_staging",
        cicd: "no",
        qa_level: "standard",
        revision_rounds: "two",
        communication: ["more_than_two_stakeholders"],
        risk_factors: [],
        docs_level: "basic",
    },
};

const scenarioB_wooWeakInputs: Scenario = {
    name: "B. WooCommerce, weak inputs (expect medium confidence, ~20% reserve)",
    answers: {
        project_type: "woocommerce",
        project_origin: "new",
        design_status: "desktop_only",
        specs_status: "partial",
        content_status: "later",
        requirements_stability: "may_change",
        build_approach: "native_gutenberg",
        design_complexity: "standard",
        unique_blocks: { count: 11 },
        templates: { simple: 2, dynamic: 0 },
        header_complexity: "mega_menu",
        animations_level: "none",
        pixel_perfect: "no",
        cpt_count: { count: 0 },
        taxonomy_count: { count: 0 },
        relations: "none",
        admin_custom: "yes",
        editor_flexibility: "flexible",
        search_level: "by_cpt_fields",
        filters_level: "simple",
        forms: { simple: 1, with_logic: 0, multi_step: 0 },
        users_level: "none",
        product_types: "has_variable",
        checkout_level: "light_custom",
        payments: { standard: 1, local: 1 },
        shipping_level: "courier_api",
        woo_extensions: [],
        integrations: { plugin: 1, one_way: 0, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "developer",
        content_fill_pages: { pages: 15 },
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        analytics_ecommerce: "yes",
        cookie_consent: "yes",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "sftp_only",
        cicd: "no",
        qa_level: "standard",
        revision_rounds: "two",
        communication: ["regular_calls"],
        risk_factors: ["third_party_dependency"],
        docs_level: "basic",
    },
};

const scenarioC_bookingCleanButComplex: Scenario = {
    name: "C. Booking, clean inputs, plugin heavily customized (expect high/medium border, ~12% reserve)",
    answers: {
        project_type: "booking",
        project_origin: "new",
        design_status: "final_all",
        specs_status: "described",
        content_status: "final",
        requirements_stability: "approved",
        build_approach: "theme_child",
        design_complexity: "standard",
        unique_blocks: { count: 9 },
        templates: { simple: 2, dynamic: 1 },
        header_complexity: "simple",
        animations_level: "none",
        pixel_perfect: "no",
        cpt_count: { count: 1 },
        search_level: "standard",
        filters_level: "none",
        forms: { simple: 0, with_logic: 0, multi_step: 0 },
        users_level: "login_register",
        booking_build_approach: "plugin_customization",
        booking_resource_type: "multi_resource",
        booking_payment: "prepay_deposit",
        booking_changes: "policy",
        booking_notifications: "email_sms",
        integrations: { plugin: 0, one_way: 1, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "client",
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        cookie_consent: "yes",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "ssh_git_staging",
        cicd: "no",
        qa_level: "standard",
        revision_rounds: "one",
        communication: [],
        risk_factors: ["fixed_deadline"],
        docs_level: "basic",
    },
};

const scenarioI_bookingCustomLogic: Scenario = {
    name: "I. Booking, same features as C but fully custom logic (expect noticeably more hours + execution risk)",
    answers: {
        ...scenarioC_bookingCleanButComplex.answers,
        booking_build_approach: "custom_logic",
    },
};

const scenarioD_everythingMaxed: Scenario = {
    name: "D. Everything maxed out — stress test (expect low confidence, 35% reserve cap, discovery recommendation)",
    answers: {
        project_type: "corporate",
        project_origin: "new",
        design_status: "references_only",
        specs_status: "none",
        content_status: "later",
        requirements_stability: "will_change",
        build_approach: "custom_acf",
        design_complexity: "creative",
        unique_blocks: { count: 20 },
        templates: { simple: 5, dynamic: 1 },
        header_complexity: "multiple_variants",
        animations_level: "advanced",
        pixel_perfect: "yes",
        cpt_count: { count: 3 },
        taxonomy_count: { count: 5 },
        relations: "complex",
        admin_custom: "yes",
        editor_flexibility: "full",
        search_level: "algolia_es",
        filters_level: "dependent_counts",
        forms: { simple: 1, with_logic: 2, multi_step: 1 },
        users_level: "portal_roles",
        integrations: { plugin: 1, one_way: 1, two_way: 1 },
        integrations_docs: "poor_unknown",
        languages: "many",
        rtl: "yes",
        content_fill: "developer",
        content_fill_pages: { pages: 20 },
        import_level: "dirty_relations",
        seo_level: "schema_custom",
        analytics_level: "custom_events",
        cookie_consent: "yes",
        performance_level: "target_cwv",
        accessibility_level: "wcag_aa",
        hosting_access: "unknown",
        cicd: "yes",
        qa_level: "strict",
        revision_rounds: "three_plus",
        communication: [
            "slow_feedback_or_timezones",
            "more_than_two_stakeholders",
            "regular_calls",
            "jira_reports",
        ],
        risk_factors: [
            "fixed_deadline",
            "multiple_decision_makers",
            "parallel_devs",
            "third_party_dependency",
        ],
        docs_level: "full_training",
    },
};

const scenarioE_landingMinimal: Scenario = {
    name: "E. Landing page, minimal scope (expect low hours, high confidence)",
    answers: {
        project_type: "landing",
        project_origin: "new",
        design_status: "final_all",
        specs_status: "described",
        content_status: "final",
        requirements_stability: "approved",
        build_approach: "page_builder",
        design_complexity: "standard",
        unique_blocks: { count: 7 },
        templates: { simple: 1, dynamic: 0 },
        header_complexity: "simple",
        animations_level: "none",
        pixel_perfect: "no",
        cpt_count: { count: 0 },
        search_level: "standard",
        filters_level: "none",
        forms: { simple: 1, with_logic: 0, multi_step: 0 },
        users_level: "none",
        integrations: { plugin: 0, one_way: 0, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "client",
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        cookie_consent: "no",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "ssh_git_staging",
        cicd: "no",
        qa_level: "developer_self",
        revision_rounds: "one",
        communication: [],
        risk_factors: [],
        docs_level: "none",
    },
};

const scenarioF_membershipPortal: Scenario = {
    name: "F. Membership portal, moderate complexity (expect medium-high confidence)",
    answers: {
        project_type: "membership",
        project_origin: "new",
        design_status: "final_all",
        specs_status: "described",
        content_status: "final",
        requirements_stability: "approved",
        build_approach: "custom_acf",
        design_complexity: "custom",
        unique_blocks: { count: 9 },
        templates: { simple: 2, dynamic: 2 },
        header_complexity: "simple",
        animations_level: "basic",
        pixel_perfect: "no",
        cpt_count: { count: 2 },
        taxonomy_count: { count: 1 },
        relations: "simple",
        admin_custom: "no",
        editor_flexibility: "flexible",
        search_level: "standard",
        filters_level: "none",
        forms: { simple: 1, with_logic: 0, multi_step: 0 },
        users_level: "portal_roles",
        integrations: { plugin: 1, one_way: 0, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "client",
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        cookie_consent: "yes",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "ssh_git_staging",
        cicd: "no",
        qa_level: "standard",
        revision_rounds: "two",
        communication: [],
        risk_factors: [],
        docs_level: "basic",
    },
};

const scenarioG_directoryListings: Scenario = {
    name: "G. Directory / listings, typical scope (expect medium-high confidence)",
    answers: {
        project_type: "directory",
        project_origin: "new",
        design_status: "final_all",
        specs_status: "described",
        content_status: "final",
        requirements_stability: "approved",
        build_approach: "native_gutenberg",
        design_complexity: "standard",
        unique_blocks: { count: 10 },
        templates: { simple: 2, dynamic: 3 },
        header_complexity: "simple",
        animations_level: "none",
        pixel_perfect: "no",
        cpt_count: { count: 1 },
        taxonomy_count: { count: 2 },
        relations: "none",
        admin_custom: "no",
        editor_flexibility: "flexible",
        search_level: "by_cpt_fields",
        filters_level: "ajax_url",
        forms: { simple: 0, with_logic: 0, multi_step: 1 },
        users_level: "login_register",
        integrations: { plugin: 1, one_way: 0, two_way: 0 },
        integrations_docs: "normal",
        languages: "one",
        content_fill: "client",
        import_level: "none",
        seo_level: "basic",
        analytics_level: "ga4_gtm",
        cookie_consent: "yes",
        performance_level: "standard",
        accessibility_level: "basic",
        hosting_access: "ssh_git_staging",
        cicd: "no",
        qa_level: "standard",
        revision_rounds: "two",
        communication: [],
        risk_factors: [],
        docs_level: "basic",
    },
};

const scenarioH_stopFlagMarketplace: Scenario = {
    name: "H. Marketplace — stop-flag demonstration (expect immediate stop, no estimate)",
    answers: {
        project_type: "marketplace",
        project_origin: "new",
    },
};

const scenarios: Scenario[] = [
    scenarioA_cleanCorporate,
    scenarioB_wooWeakInputs,
    scenarioC_bookingCleanButComplex,
    scenarioD_everythingMaxed,
    scenarioE_landingMinimal,
    scenarioF_membershipPortal,
    scenarioG_directoryListings,
    scenarioH_stopFlagMarketplace,
    scenarioI_bookingCustomLogic,
];

function formatHours(range: { min: number; max: number }): string {
    return `${Math.round(range.min)}–${Math.round(range.max)}h`;
}

for (const scenario of scenarios) {
    console.log(`\n${"=".repeat(78)}`);
    console.log(scenario.name);
    console.log("=".repeat(78));

    const result = calculateEstimate(steps, scenario.answers);

    if (result.status === "stop") {
        console.log(`STOP: ${result.message}`);
        continue;
    }

    const { workstreamBreakdown, totalHours, riskReservePercent, confidenceLevel, discoveryRecommendation, assumptions } =
        result.estimate;

    console.log("\nBreakdown:");
    for (const item of workstreamBreakdown) {
        console.log(`  ${item.label.padEnd(28)} ${formatHours(item.hours)}`);
    }

    console.log(`\nTotal: ${formatHours(totalHours)}`);
    console.log(`Confidence: ${confidenceLevel}  (risk reserve ${riskReservePercent.toFixed(1)}%)`);
    console.log(`Discovery recommendation: ${discoveryRecommendation ? discoveryRecommendation.message : "none"}`);

    console.log("\nAssumptions:");
    for (const line of assumptions) {
        console.log(`  - ${line}`);
    }
}
