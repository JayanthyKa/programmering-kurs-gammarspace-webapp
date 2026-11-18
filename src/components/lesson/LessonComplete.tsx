import { useEffect, useRef } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'

interface LessonCompleteProps {
  /** Where this lesson sits, e.g. "Unit 1 · Lesson 2 of 3". */
  eyebrow: string
  /** "Lesson complete", or "Unit complete" after the last lesson of a unit. */
  heading: string
  /** Name of the lesson that was just finished. */
  title: string
  total: number
  /** What was unlocked. */
  note: string
  /** Link to what comes next; absent after the very last lesson. */
  nextHref?: string
  /** "Next lesson" inside a unit, "Next unit" at the end of one. */
  nextLabel?: string
  onRestart: () => void
}

export function LessonComplete({
  eyebrow,
  heading,
  title,
  total,
  note,
  nextHref,
  nextLabel,
  onRestart,
}: LessonCompleteProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section
      aria-labelledby="complete-title"
      className="rounded-2xl border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-10 sm:py-16"
    >
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-tint text-teal-text">
        <Icon name="trophy" size={34} strokeWidth={1.7} />
      </span>
      <p className="mt-6 text-xs font-extrabold tracking-[0.1em] text-teal-text uppercase">
        {eyebrow}
      </p>
      <h2
        id="complete-title"
        ref={headingRef}
        tabIndex={-1}
        className="font-display mt-2 text-3xl font-bold text-ink outline-none"
      >
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-soft">
        You finished “{title}” and placed all {total} answers correctly. {note}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        {nextHref && nextLabel ? (
          <Button href={nextHref}>
            {nextLabel}
            <Icon name="arrowRight" size={18} />
          </Button>
        ) : (
          <Button href="#/achievements">
            See my badges
            <Icon name="arrowRight" size={18} />
          </Button>
        )}
        <Button variant="secondary" onClick={onRestart}>
          Restart lesson
          <Icon name="refresh" size={18} />
        </Button>
        <Button variant="secondary" href="#/topics">
          Back to topics
        </Button>
      </div>
    </section>
  )
}
