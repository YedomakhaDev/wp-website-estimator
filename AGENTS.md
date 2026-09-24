# Website Estimator

## Product

A free WordPress Project Estimator.

The user completes a step-by-step questionnaire and receives:

- estimated development hours;
- workstream breakdown;
- QA and fixes allowance;
- PM and communication allowance;
- deployment estimate;
- risk reserve;
- confidence level;
- automatically generated assumptions;
- optional cost based on an hourly rate.

## MVP constraints

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static-first architecture
- No database
- No authentication
- No backend
- No CMS
- No AI
- No PDF export
- No saved estimates
- English only for the first release
- Identical answers must always produce identical results

## Code principles

- Keep calculation logic independent from React components.
- Keep question IDs independent from visible English labels.
- Store questions and calculation rules outside UI components.
- Use small reusable components only when there is real repetition.
- Do not install dependencies without explaining why.
- Do not modify unrelated files.
- Prefer clear code over clever abstractions.
- Use semantic HTML and accessible controls.
- Ensure responsive behavior.
- Run lint and build after meaningful changes.

## Learning requirement

The project owner is learning React, TypeScript and Next.js.

Before implementing unfamiliar architecture:

1. Explain what will be created.
2. Compare important React concepts with vanilla JavaScript or Twig where helpful.
3. Implement in small reviewable steps.
4. Do not generate the entire application at once.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
