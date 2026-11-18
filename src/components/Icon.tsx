const PATHS = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  grip: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  book: 'M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15zM5 19.5A1.5 1.5 0 0 0 6.5 21H19',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.9h.01',
  trophy:
    'M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8.5 20h7M10 17h4v3h-4z',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  play: 'M8 5.5v13l10-6.5-10-6.5z',
  sparkle:
    'M11 4l1.7 4.8L17.5 10.5l-4.8 1.7L11 17l-1.7-4.8L4.5 10.5l4.8-1.7L11 4zM18.5 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z',
  palette:
    'M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.2-.8-1.6-.8-2.5 0-.8.7-1.5 1.5-1.5H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8zM7.5 12.5h.01M9.5 8.5h.01M14.5 7.5h.01',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
  flame:
    'M12 3c1 3.5 4.5 5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-1.8.8-3 1.8-4 .3 1.5 1 2.2 1.7 2.5C10.5 8.5 11 5.5 12 3z',
  chevronDown: 'M6 9l6 6 6-6',
  save: 'M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6',
  user: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6.2 18.2a6.5 6.5 0 0 1 11.6 0',
  refresh: 'M20 5v5h-5M4 19v-5h5M19.4 10A8 8 0 0 0 5.3 7.6M4.6 14a8 8 0 0 0 14.1 2.4',
} as const

export type IconName = keyof typeof PATHS

interface IconProps {
  name: IconName
  /** Size in pixels. */
  size?: number
  strokeWidth?: number
  className?: string
}

/** One stroke-based icon set for the whole app. Icons are decorative; label the control. */
export function Icon({ name, size = 20, strokeWidth = 1.9, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === 'grip' ? 2.6 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
