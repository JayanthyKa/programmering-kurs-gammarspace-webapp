import type { Ref } from 'react'
import type { Exercise } from '../../data/exercises'
import type { AnswerStatus } from '../../lesson/lessonState'
import { Icon } from '../Icon'

interface SentenceWorkspaceProps {
  exercise: Exercise
  placed: string | null
  status: AnswerStatus
  /** A chip is being dragged right now. */
  dragging: boolean
  /** The dragged chip is over the slot. */
  over: boolean
  onRemove: () => void
  slotRef: Ref<HTMLSpanElement>
}

const SLOT_BASE =
  'inline-flex h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-[9px] border-2 px-3 text-[15px] font-bold tracking-normal transition-[transform,background-color,border-color,box-shadow]'

export function SentenceWorkspace({
  exercise,
  placed,
  status,
  dragging,
  over,
  onRemove,
  slotRef,
}: SentenceWorkspaceProps) {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-dashed border-line-strong bg-sunken/60 px-5 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-2 pb-4">
        <h3 className="text-xs font-extrabold tracking-[0.11em] text-muted uppercase">
          Your sentence
        </h3>
        <Icon name="sparkle" size={16} className="text-primary-text" />
      </div>

      <p className="font-display text-[clamp(1.25rem,1.6vw+0.9rem,1.5625rem)] leading-[2.1] tracking-[-0.02em] text-ink">
        {exercise.before}{' '}
        <span ref={slotRef} className="mx-0.5 inline-flex align-middle">
          {placed === null ? (
            <span
              className={`${SLOT_BASE} text-sm ${
                over
                  ? 'scale-105 border-solid border-primary-text bg-primary-tint text-primary-text'
                  : 'border-dashed border-slot-line bg-slot text-primary-text'
              } ${dragging && !over ? 'slot-waiting' : ''}`}
            >
              <span className="sr-only">blank</span>
              <span aria-hidden="true">Drop word here</span>
            </span>
          ) : status === 'idle' ? (
            <button
              key={placed}
              type="button"
              onClick={onRemove}
              aria-label={`Remove “${placed}” from the sentence`}
              title="Remove word"
              className={`slot-pop ${SLOT_BASE} border-primary-text bg-surface text-ink hover:bg-primary-tint ${
                over ? 'scale-105 ring-4 ring-primary/25' : ''
              }`}
            >
              {placed}
              <Icon name="x" size={16} className="text-muted" />
            </button>
          ) : status === 'correct' ? (
            <span className={`slot-pop ${SLOT_BASE} border-teal-deep bg-teal-deep text-white`}>
              {placed}
              <Icon name="check" size={17} strokeWidth={2.4} />
              <span className="sr-only">(correct)</span>
            </span>
          ) : (
            <span className={`slot-pop ${SLOT_BASE} border-coral bg-coral-tint text-coral-text`}>
              {placed}
              <Icon name="x" size={17} strokeWidth={2.4} />
              <span className="sr-only">(incorrect)</span>
            </span>
          )}
        </span>{' '}
        {exercise.after}
      </p>

      <p className="pt-4 text-[13px] leading-snug text-muted">
        {placed === null
          ? 'Drag a word into the highlighted space, or tap a word to place it.'
          : status === 'idle'
            ? 'Tap the word in the sentence to remove it, or choose another to replace it.'
            : status === 'correct'
              ? 'Nice work. Continue when you are ready.'
              : 'Have another look at the subject, then try again.'}
      </p>
    </div>
  )
}
