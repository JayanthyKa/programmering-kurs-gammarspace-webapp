import { useSyncExternalStore } from 'react'

/** Colour themes from the Figma "Theme" component. */
export const THEMES = [
  { id: 'blue', label: 'Blue', swatch: '#4263d8' },
  { id: 'purple', label: 'Purple', swatch: '#aa2aca' },
  { id: 'red', label: 'Red', swatch: '#a65348' },
] as const

export type Theme = (typeof THEMES)[number]['id']

const STORAGE_KEY = 'gs-theme'
const listeners = new Set<() => void>()

function readTheme(): Theme {
  const value = document.documentElement.dataset.theme
  return value === 'purple' || value === 'red' ? value : 'blue'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener())
}

/** The initial theme is set by the inline script in index.html before first paint. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'blue' as Theme)
  return { theme, setTheme }
}
