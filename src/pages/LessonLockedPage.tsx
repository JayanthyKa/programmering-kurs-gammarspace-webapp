import { AppShell } from '../components/AppShell'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { lessonHref } from '../data/units'
import type { Unit, UnitLesson } from '../data/units'
import { useProgress } from '../hooks/useProgress'
import { currentLessonInUnit } from '../lesson/lessonOrder'

/** Shown when a lesson is opened by address before the lessons in front of it are finished. */
export function LessonLockedPage({ unit, lesson }: { unit: Unit; lesson: UnitLesson }) {
  const { completedLessons } = useProgress()
  const current = currentLessonInUnit(lesson.topic, completedLessons)

  return (
    <AppShell current="lesson" eyebrow={unit.eyebrow} title={unit.heading}>
      <section
        aria-labelledby="locked-title"
        className="mx-auto max-w-xl rounded-2xl border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-10 sm:py-14"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-sunken text-muted">
          <Icon name="lock" size={32} strokeWidth={1.7} />
        </span>
        <h2 id="locked-title" className="font-display mt-6 text-2xl font-bold text-ink">
          This lesson is still locked
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
          Lessons in {unit.name} open one after another. Finish “{current.title}” to get closer to “
          {lesson.title}
          ”.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={lessonHref(current)}>
            Go to my lesson
            <Icon name="arrowRight" size={18} />
          </Button>
          <Button variant="secondary" href="#/topics">
            Back to topics
          </Button>
        </div>
      </section>
    </AppShell>
  )
}
