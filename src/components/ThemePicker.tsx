import { useEffect, useId, useRef, useState } from 'react'
import { THEMES, useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'

/** "Theme" in the header: opens the three colour swatches from the Figma Theme component. */
export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-base text-ink transition-colors hover:bg-primary-tint"
      >
        <Icon name="palette" size={20} className="text-primary-text" />
        <span className="sr-only sm:not-sr-only">Theme</span>
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label="Colour theme"
          className="absolute top-full right-0 z-40 mt-2 flex gap-1 rounded-xl border border-line bg-surface p-2 shadow-lift"
        >
          {THEMES.map((option) => {
            const selected = option.id === theme
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                aria-label={`${option.label} theme`}
                title={`${option.label} theme`}
                onClick={() => setTheme(option.id)}
                className="grid size-11 place-items-center rounded-lg transition-colors hover:bg-sunken"
              >
                <span
                  className={`grid size-6 place-items-center rounded-full border border-muted text-white ${
                    selected ? 'ring-2 ring-ink ring-offset-2 ring-offset-surface' : ''
                  }`}
                  style={{ backgroundColor: option.swatch }}
                >
                  {selected && <Icon name="check" size={13} strokeWidth={3.2} />}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
