# CLAUDE.md

The project guide lives in AGENTS.md so that every coding agent reads the same instructions.

@AGENTS.md

## Claude Code notes

- The dev server is configured in `.claude/launch.json` (`grammarspace`, port 5173). Start it with the preview tool rather than a shell command, and reuse it if it is already running.
- On this Windows machine Node.js is installed at `C:\Program Files\nodejs`. If `npm` is not found in a shell, call it by full path or use `npm.cmd`.
- Verify UI changes in the browser at mobile (375px), tablet (768px) and desktop (1440px) widths before reporting them as done.
