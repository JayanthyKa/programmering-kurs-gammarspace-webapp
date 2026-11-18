import { lessonHref } from '../../data/units'
import type { Unit, UnitLesson } from '../../data/units'
import { Icon } from '../Icon'

interface UnitPathPanelProps {
  unit: Unit
  /** The lesson that is open right now. */
  lesson: UnitLesson
  /** Steps answered correctly in the open lesson. */
  completed: number
  total: number
  /** Ids of every finished lesson. */
  completedLessons: string[]
}

const ROW = 'flex min-h-[60px] items-center gap-2.5 rounded-[9px] px-2 py-2.5'
const BADGE = 'grid size-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold'

/** "Your path" side panel: the lessons of this unit and where the learner is in them. */
export function UnitPathPanel({
  unit,
  lesson,
  completed,
  total,
  completedLessons,
}: UnitPathPanelProps) {
  const isDone = (item: UnitLesson) => completedLessons.includes(item.id)
  // The intro (if any) counts as one finished part; each lesson adds one more.
  const introParts = unit.intro ? 1 : 0
  const parts = unit.lessons.reduce((sum, item) => {
    const finished = isDone(item) ? 1 : 0
    return sum + (item.id === lesson.id ? Math.max(finished, completed / total) : finished)
  }, introParts)
  const percent = Math.round((parts / (unit.lessons.length + introParts)) * 100)
  const lessonsLeft = unit.lessons.filter((item) => !isDone(item)).length

  return (
    <aside
      aria-labelledby="unit-title"
      className="rounded-2xl border border-line bg-surface p-5 sm:p-[22px]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold tracking-[0.12em] text-primary-text uppercase">
            Your path
          </p>
          <h2 id="unit-title" className="font-display pt-0.5 text-lg font-semibold text-ink">
            {unit.name}
          </h2>
        </div>
        <span className="text-sm font-extrabold text-primary-text">{percent}%</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${unit.name} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-off"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-5 grid gap-1.5">
        {unit.intro && (
          <li className={ROW}>
            <span className={`${BADGE} bg-teal-deep text-white`}>
              <Icon name="check" size={17} strokeWidth={2.4} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-muted line-through">
                {unit.intro.title}
              </span>
              <span className="block pt-0.5 text-xs text-muted">{unit.intro.detail}</span>
            </span>
          </li>
        )}

        {unit.lessons.map((item, index) => {
          const number = index + 1 + introParts
          const done = isDone(item)
          const previous = unit.lessons[index - 1]
          const open = index === 0 || isDone(previous)

          if (item.id === lesson.id) {
            const finishedNow = done || completed >= total
            return (
              <li key={item.id} aria-current="step" className={`${ROW} bg-primary-tint`}>
                <span
                  className={`${BADGE} text-white ${finishedNow ? 'bg-teal-deep' : 'bg-primary'}`}
                >
                  {finishedNow ? <Icon name="check" size={17} strokeWidth={2.4} /> : number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-primary-text">{item.title}</span>
                  <span className="block pt-0.5 text-xs text-muted">
                    {completed >= total ? 'Completed' : `In progress · ${completed} of ${total}`}
                  </span>
                </span>
                {completed < total && (
                  <Icon name="play" size={17} className="shrink-0 text-primary-text" />
                )}
              </li>
            )
          }

          if (!open) {
            return (
              <li key={item.id} className={ROW}>
                <span className={`${BADGE} bg-off text-muted`}>{number}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink-soft">{item.title}</span>
                  <span className="block pt-0.5 text-xs text-muted">
                    {item.exercises.length} questions
                  </span>
                </span>
                <Icon name="lock" size={16} className="shrink-0 text-muted" />
                <span className="sr-only">Locked</span>
              </li>
            )
          }

          return (
            <li key={item.id}>
              <a href={lessonHref(item)} className={`${ROW} transition-colors hover:bg-sunken`}>
                <span
                  className={`${BADGE} ${done ? 'bg-teal-deep text-white' : 'bg-off text-ink-soft'}`}
                >
                  {done ? <Icon name="check" size={17} strokeWidth={2.4} /> : number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink-soft">{item.title}</span>
                  <span className="block pt-0.5 text-xs text-muted">
                    {done ? 'Completed' : `${item.exercises.length} questions`}
                  </span>
                </span>
                <Icon name="arrowRight" size={16} className="shrink-0 text-muted" />
              </a>
            </li>
          )
        })}
      </ol>

      <div className="mt-5 flex items-center gap-2.5 rounded-[10px] bg-lav-tint p-3.5 text-lav-text">
        <Icon name="trophy" size={24} strokeWidth={1.7} className="shrink-0" />
        <p className="min-w-0 flex-1">
          <span className="block text-[11px] font-extrabold tracking-[0.08em] uppercase">
            Next reward
          </span>
          <span className="block text-sm font-bold">Grammar Explorer</span>
        </p>
        <span className="text-xs">{lessonsLeft === 1 ? '1 lesson' : `${lessonsLeft} lessons`}</span>
      </div>
    </aside>
  )
}
