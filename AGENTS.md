# AGENTS.md

Guidance for AI coding agents (and new contributors) working in this repository.

## What this is

GrammarSpace is a grammar-learning web app for children aged 9–12. Learners drag or tap a word into a sentence; a journey path with six discs shows lesson progress. It is a static single-page app with no server and no accounts.

- Live site: https://jayanthyka.github.io/grammarspace-webapp/
- Design source: Figma file "Learning-website". The `design` page holds the original designs; the `implementation review` page holds frames of the app as built.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4. The only runtime dependencies are `react` and `react-dom`. Do not add dependencies without asking; routing, drag and drop, state and icons are all hand-written on purpose.

## Commands

```bash
npm install        # once
npm run dev        # dev server at http://localhost:5173/
npm run format     # Prettier
npm run lint       # oxlint
npm run build      # type-check (tsc -b) and production build into dist/
```

Run `format`, `lint` and `build` before every commit; all three must pass with no errors or warnings. There is no test suite; verify behaviour in the browser.

On Windows PowerShell, `npm` may be blocked by the script execution policy. Use `npm.cmd run dev` instead.

## Layout

```
src/
  App.tsx              picks the page for the current route
  index.css            design tokens, colour themes, journey animation
  pages/               one file per screen
  components/          shared UI: AppShell, Button, Icon, Avatar, ThemePicker, Logo
  components/lesson/   JourneyPath, ExerciseCard, WordBank, SentenceWorkspace, FeedbackCard
  data/                lessons, practice questions, library rules, topics, avatars
  hooks/               useHashRoute, useTheme, useProgress, useProfile, useDragToSlot
  lesson/              lessonState (reducer), lessonOrder (unlocking)
```

## How things work

- **Routing** is hash-based (`#/topics`, `#/lesson/tense`, …) in `hooks/useHashRoute.ts`. Add a route there and in `App.tsx`. Hash routing is what lets the app run on GitHub Pages without server rewrites.
- **Units and lessons.** Each topic card is a unit of three or four lessons with six exercises each. `data/lessons.ts` holds every unit's details and main first lesson, `data/moreLessons.ts` an optional opening lesson (`OPENING_LESSONS`, used by Parts of speech for "What is a word class?") and the lessons that follow, and `data/units.ts` joins them into `UNITS`. A lesson's address is `#/lesson/<topic>/<number>` and its progress id is `<topic>/<number>`.
- **Order and unlocking** (`lesson/lessonOrder.ts`): every unit card is open. Inside a unit the first lesson is open and finishing a lesson unlocks the next one in the same unit. Units follow the order of `TOPICS` in `data/topics.ts` (Parts of speech, Tense, Punctuation, Sentence). "Next lesson" must stay inside the unit; "Next unit" appears only after a unit's last lesson.
- **Exercise state** lives in the pure reducer `lesson/lessonState.ts`. The journey marker advances only when an answer is correct; keep it that way.
- **Drag and drop** uses Pointer Events (`hooks/useDragToSlot.ts`) so mouse, touch and pen share one code path. Clicking or pressing Enter on a word must keep working as the accessible alternative.
- **Persistence** is `localStorage` only: `gs-progress` (XP, finished lessons, saved lesson positions), `gs-profile` (nickname, avatar) and `gs-theme`. Each has a small external store read with `useSyncExternalStore`. Always tolerate missing or malformed stored data.
- **Themes** are `blue`, `purple` and `red`, set as `data-theme` on `<html>` and defined as CSS variables in `index.css`. Each theme sets the accent colours and a matching page background. There is no dark theme.
- **Sign-in page** offers "Continue as guest" only in practice; "Log in / Sign up" shows a coming-soon note. Do not collect passwords or any personal data.

## Conventions

- Style with Tailwind utilities that map to the tokens in `index.css` (`bg-surface`, `text-ink`, `text-primary-text`, …). Do not hard-code colours that already have a token.
- Colours: teal means correct, coral means incorrect, sunshine yellow marks the current step. Avoid gradients.
- Icons come from `components/Icon.tsx` (one stroke-based set). No emoji in the UI.
- Accessibility is required, not optional: semantic HTML, visible focus, labels on icon-only controls, `aria-live` for feedback, 44px touch targets, and no motion unless `prefers-reduced-motion: no-preference`.
- Layouts must work at 320px, 768px and 1440px without horizontal scrolling.
- Content is written for 9–12 year olds: short sentences, British spelling ("colour", "practise", "full stop").
- Files that export React components should export only components (the linter warns otherwise); put shared data and helpers in `data/`, `hooks/` or `lesson/`.
- Prettier settings: no semicolons, single quotes, 100 columns.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which lints, builds and publishes `dist/` to GitHub Pages. Production builds use the base path `/grammarspace-webapp/` (see `vite.config.ts`); the dev server runs at the root. Because every push to `main` goes live, do not push work the owner has not approved.

## Working agreement with the owner

- Ask before making choices that are not obvious: new dependencies, scope, wording of lesson content, or deviations from the Figma design.
- After UI changes, add as-built frames to the `implementation review` page in the Figma file (new frames; never edit the `design` page) and ask for approval before calling the work final.
- Commit or push only when asked.
