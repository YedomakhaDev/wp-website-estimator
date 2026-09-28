# WP Estimate

A free WordPress project estimator. The user answers a step-by-step questionnaire and gets a development hours range, a workstream breakdown, QA/PM/deployment allowances, a risk reserve, a scope confidence level, auto-generated assumptions, and — optionally — a cost based on an hourly rate.

Static-first Next.js app: no backend, no database, no auth, no CMS. See `AGENTS.md` for the full product spec and coding principles.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build   # production build
npm run lint    # eslint
npx tsx scripts/scenarios.ts   # run the fixed calibration scenarios and print their breakdowns
```

## Project structure

The questionnaire, the calculation engine, and the UI are kept separate on purpose:

- `src/lib/types.ts` — the schema: questions, effects, buckets, risk contributions, the result shape.
- `src/lib/questions.ts` — the actual questionnaire content (steps, questions, options, per-option effects). No calculation logic here.
- `src/lib/calculator.ts` — the pure calculation engine: turns `(steps, answers)` into an `EstimateResult`. No React, no UI concerns.
- `src/components/Calculator.tsx` — the wizard UI: step navigation, live-updating result panel. Reads from `questions.ts`, computes via `calculator.ts`.
- `scripts/scenarios.ts` — a set of fixed answer sets (realistic projects + a deliberate stress test + a stop-flag case) used to eyeball whether the model still behaves sensibly after changing coefficients. Not wired into CI yet — run it manually after touching `calculator.ts` or `questions.ts`.

## Adding or changing a question

1. Add it to the relevant step in `src/lib/questions.ts` — pick an `id`, a `label`, a `type` (`single-choice` / `multi-choice` / `quantity`), and an `effect` per option (hours, risk points, percentages — see `Effect` in `types.ts`).
2. If it needs to be conditionally shown, add a `visibleIf` that reads other answers.
3. Re-run `npx tsx scripts/scenarios.ts` to check nothing drifted unexpectedly.
4. `npm run lint && npm run build` before committing.

Planning notes and calibration write-ups live in `_plans/` locally (gitignored, not part of the repo).
