# GrammarSpace

A grammar-learning web app for children aged 9–12. Short lessons where you drag (or tap) the right word into a sentence, with a playful journey path that tracks progress.

Design: Figma file "Learning-website" (pages `design` and `implementation review`).

## Features

- **Four units** — Parts of speech, Tense, Punctuation and Sentence — with three or four lessons each. Every lesson has six exercises and a stepping-disc journey path; the map pin hops forward only on a correct answer. Lessons inside a unit unlock in order, and a lesson can be saved and resumed.
- **Drag and drop** with Pointer Events (mouse, touch and pen), plus click/tap and keyboard placement.
- **Library** of grammar rules with examples, **Practice** rounds with a streak counter, and **Achievements** with XP and badges.
- **Guest sign-in and profile** with a nickname and a choice of avatars.
- **Colour themes**: blue, purple and red.
- Progress, profile and theme are saved in the browser (`localStorage`). There are no accounts and no server.
- Responsive for desktop, tablet and mobile; respects `prefers-reduced-motion`.

## Tech

React 19, TypeScript, Vite, Tailwind CSS v4. No runtime dependencies beyond React.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Scripts

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the dev server                             |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Lint with oxlint                                 |
| `npm run format`  | Format with Prettier                             |

## Project layout

```
src/
  components/        shared UI (AppShell, Button, Icon, Avatar, ThemePicker)
  components/lesson/ journey path, exercise card, word bank, sentence slot
  data/              lessons, practice questions, library rules, topics, avatars
  hooks/             hash routing, theme, progress, profile, drag-to-slot
  lesson/            lesson state reducer, lesson order and unlocking
  pages/             one file per screen
  index.css          design tokens, colour themes, journey animation
```

## License

[MIT](LICENSE)
