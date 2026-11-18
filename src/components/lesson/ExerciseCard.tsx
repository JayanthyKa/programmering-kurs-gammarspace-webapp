import { useEffect, useRef } from 'react'
import type { Dispatch } from 'react'
import type { Exercise } from '../../data/exercises'
import { useDragToSlot } from '../../hooks/useDragToSlot'
import type { AnswerStatus, LessonAction } from '../../lesson/lessonState'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { FeedbackCard } from './FeedbackCard'
import { SentenceWorkspace } from './SentenceWorkspace'
import { WordBank } from './WordBank'

interface ExerciseCardProps {
  title: string
  /** Optional hint banner under the title. */
  tip?: string
  exercise: Exercise
  placed: string | null
  status: AnswerStatus
  /** Label of the button shown after a correct answer. */
  nextLabel: string
  canSkip: boolean
  dispatch: Dispatch<LessonAction>
}

export function ExerciseCard({
  title,
  tip,
  exercise,
  placed,
  status,
  nextLabel,
  canSkip,
  dispatch,
}: ExerciseCardProps) {
  const idle = status === 'idle'
  const { slotRef, ghost, chipProps } = useDragToSlot({
    enabled: idle,
    onDrop: (word) => dispatch({ type: 'place', word }),
    // Tapping the word that is already placed takes it back out.
    onActivate: (word) => dispatch(word === placed ? { type: 'remove' } : { type: 'place', word }),
  })

  // When a new attempt starts (Try again / Continue), hand focus back to the word bank,
  // because the button the user just pressed becomes disabled.
  const bankRef = useRef<HTMLDivElement>(null)
  const previousStatus = useRef(status)
  useEffect(() => {
    const was = previousStatus.current
    previousStatus.current = status
    if (was !== 'idle' && status === 'idle') {
      bankRef.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
    }
  }, [status])

  return (
    <section
      aria-labelledby="lesson-title"
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <div className="flex items-center gap-3.5 border-b border-line px-5 py-5 sm:px-7 sm:py-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-primary-tint text-primary-text">
          <Icon name="book" size={24} />
        </span>
        <h2 id="lesson-title" className="font-display text-xl font-semibold text-ink">
          {title}
        </h2>
      </div>

      {tip && (
        <div className="px-5 pt-5 sm:px-7 sm:pt-6">
          <p className="flex items-start gap-2.5 rounded-[10px] border border-sun-line bg-sun-tint px-3.5 py-3 text-sm leading-snug text-sun-text">
            <Icon name="sparkle" size={18} className="mt-px shrink-0" />
            <span>
              <strong className="font-bold">Quick tip</strong> {tip}
            </span>
          </p>
        </div>
      )}

      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <p className="text-xs font-extrabold tracking-[0.1em] text-muted uppercase">
          Drag the correct word into the sentence
        </p>
        <div className="mt-4 grid gap-3.5 sm:grid-cols-[200px_minmax(0,1fr)]">
          <WordBank
            ref={bankRef}
            options={exercise.options}
            placed={placed}
            disabled={!idle}
            draggingWord={ghost?.word ?? null}
            chipProps={chipProps}
          />
          <SentenceWorkspace
            exercise={exercise}
            placed={placed}
            status={status}
            dragging={ghost !== null}
            over={ghost?.over ?? false}
            onRemove={() => dispatch({ type: 'remove' })}
            slotRef={slotRef}
          />
        </div>

        <div aria-live="polite" className="mt-4 empty:mt-0">
          {status === 'correct' && (
            <FeedbackCard tone="correct" title="Exactly right!" message={exercise.explanation} />
          )}
          {status === 'wrong' && (
            <FeedbackCard tone="wrong" title="Not quite" message={exercise.hint} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-7">
        {canSkip ? (
          <Button variant="ghost" onClick={() => dispatch({ type: 'skip' })}>
            Skip for now
          </Button>
        ) : (
          <span />
        )}
        {status === 'correct' ? (
          <Button onClick={() => dispatch({ type: 'next' })}>
            {nextLabel}
            <Icon name="arrowRight" size={18} />
          </Button>
        ) : status === 'wrong' ? (
          <Button onClick={() => dispatch({ type: 'retry' })}>
            Try again
            <Icon name="refresh" size={18} />
          </Button>
        ) : (
          <Button
            disabled={placed === null}
            onClick={() => dispatch({ type: 'check', correct: placed === exercise.answer })}
          >
            Check answer
            <Icon name="arrowRight" size={18} />
          </Button>
        )}
      </div>

      {ghost && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-[9px] border-2 bg-surface px-3 text-[15px] font-bold text-ink shadow-lift ${
            ghost.over ? 'border-primary-text' : 'border-slot-line'
          }`}
          style={{
            width: ghost.width,
            height: ghost.height,
            transform: `translate(${ghost.left}px, ${ghost.top}px) rotate(-3deg)`,
          }}
        >
          {ghost.word}
        </div>
      )}
    </section>
  )
}
