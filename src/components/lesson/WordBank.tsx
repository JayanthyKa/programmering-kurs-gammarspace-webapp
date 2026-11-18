import type { Ref } from 'react'
import type { useDragToSlot } from '../../hooks/useDragToSlot'
import { Icon } from '../Icon'

interface WordBankProps {
  options: string[]
  placed: string | null
  disabled: boolean
  /** Word currently being dragged, if any. */
  draggingWord: string | null
  chipProps: ReturnType<typeof useDragToSlot>['chipProps']
  ref?: Ref<HTMLDivElement>
}

const LETTERS = ['A', 'B', 'C', 'D']

export function WordBank({
  options,
  placed,
  disabled,
  draggingWord,
  chipProps,
  ref,
}: WordBankProps) {
  return (
    <div ref={ref} className="rounded-xl border border-line bg-sunken p-3.5">
      <div className="flex items-center justify-between gap-2 px-0.5 pb-3 whitespace-nowrap">
        <h3 className="text-xs font-extrabold tracking-[0.1em] text-muted uppercase">Word bank</h3>
        <span className="text-xs text-muted">Drag or tap</span>
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-[9px]">
        {options.map((word, index) => {
          const isPlaced = placed === word
          return (
            <li key={word}>
              <button
                type="button"
                disabled={disabled}
                aria-pressed={isPlaced}
                aria-label={`Place “${word}” in the sentence`}
                className={`flex min-h-12 w-full cursor-grab touch-none items-center justify-center gap-2 rounded-[9px] border px-2.5 py-1.5 shadow-chip transition-[border-color,background-color,opacity] select-none active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-55 sm:justify-start ${
                  isPlaced
                    ? 'border-primary-text bg-primary-tint'
                    : 'border-line-strong bg-surface hover:border-slot-line'
                } ${draggingWord === word ? 'opacity-40' : ''}`}
                {...chipProps(word)}
              >
                <Icon name="grip" size={16} className="hidden shrink-0 text-muted/70 sm:block" />
                <span className="text-center text-[15px] leading-tight font-bold text-ink sm:flex-1 sm:text-left">
                  {word}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden size-6 shrink-0 place-items-center rounded-md bg-off text-[11px] font-extrabold text-muted sm:grid"
                >
                  {LETTERS[index]}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
