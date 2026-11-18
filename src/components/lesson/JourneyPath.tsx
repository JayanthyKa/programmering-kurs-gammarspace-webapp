import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from '../Icon'

interface JourneyPathProps {
  /** Steps answered correctly so far (0 to `total`). */
  completed: number
  total: number
}

type DiscState = 'done' | 'current' | 'future'

/**
 * Lesson progress drawn as stepping discs on a dotted path. The coral pin stands on the
 * current disc and hops forward whenever `completed` increases. The hop itself is CSS
 * (see `.journey-pin` in index.css) and is switched off for prefers-reduced-motion.
 */
export function JourneyPath({ completed, total }: JourneyPathProps) {
  const currentIndex = Math.min(completed, total - 1)

  // Count forward moves so the hop animation restarts on every correct answer.
  const [seen, setSeen] = useState(completed)
  const [hops, setHops] = useState(0)
  if (completed !== seen) {
    setSeen(completed)
    if (completed > seen) setHops((count) => count + 1)
  }

  const pinStyle = {
    '--step': currentIndex,
    '--lift': currentIndex % 2 === 1 ? '4px' : '0px',
  } as CSSProperties

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
          Lesson journey
        </span>
        <span className="text-xs font-extrabold tracking-[0.08em] text-primary-text uppercase">
          {Math.min(completed + 1, total)} of {total}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Lesson journey"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-valuetext={
          completed >= total
            ? `All ${total} steps complete`
            : `${completed} of ${total} steps complete, now on step ${completed + 1}`
        }
        className="journey"
      >
        <span className="journey-pin" data-hop={hops > 0} style={pinStyle}>
          <span key={hops} className="block">
            <svg viewBox="0 0 28 32" className="journey-pin-body" aria-hidden="true">
              <path
                d="M14 1.5C7.9 1.5 3 6.3 3 12.3c0 7.4 8.4 15.6 10.2 17.3.5.4 1.1.4 1.6 0C16.600 27.900 25 19.700 25 12.300 25 6.300 20.100 1.500 14 1.500z"
                fill="#f17c67"
                stroke="#b4493a"
                strokeWidth="1.5"
              />
              <circle cx="14" cy="12" r="4.2" fill="#ffffff" />
            </svg>
            <span className="journey-pin-shadow" />
          </span>
        </span>

        <div className="journey-track">
          {Array.from({ length: total }, (_, index) => {
            const state: DiscState =
              index < completed ? 'done' : index === currentIndex ? 'current' : 'future'
            return (
              <span
                key={index}
                className="journey-disc"
                data-state={state}
                data-raised={index % 2 === 1}
              >
                {state === 'done' ? <Icon name="check" size={18} strokeWidth={2.8} /> : index + 1}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
