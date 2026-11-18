import { useReducer, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Icon } from '../components/Icon'
import { ExerciseCard } from '../components/lesson/ExerciseCard'
import { JourneyPath } from '../components/lesson/JourneyPath'
import { LessonComplete } from '../components/lesson/LessonComplete'
import { UnitPathPanel } from '../components/lesson/UnitPathPanel'
import { topicById } from '../data/topics'
import { lessonHref } from '../data/units'
import type { Unit, UnitLesson } from '../data/units'
import { progressActions, readProgress, useProgress } from '../hooks/useProgress'
import { lessonAfter } from '../lesson/lessonOrder'
import {
  completedSteps,
  createLessonState,
  lessonReducer,
  orderedQueue,
} from '../lesson/lessonState'
import type { LessonAction } from '../lesson/lessonState'

/** The saved place in this lesson, if there is one and it still fits the lesson. */
function savedQueue(lesson: UnitLesson): number[] | null {
  const saved = readProgress().savedLessons[lesson.id]
  if (!saved || saved.length === 0) return null
  const valid =
    saved.every((index) => index < lesson.exercises.length) && new Set(saved).size === saved.length
  return valid ? saved : null
}

export function LessonPage({ unit, lesson }: { unit: Unit; lesson: UnitLesson }) {
  const { exercises } = lesson
  const totalSteps = exercises.length
  const { completedLessons } = useProgress()
  const [state, dispatch] = useReducer(lessonReducer, lesson, (current) =>
    createLessonState(savedQueue(current) ?? orderedQueue(current.exercises.length)),
  )
  const [justSaved, setJustSaved] = useState(false)
  const completed = completedSteps(state, totalSteps)
  const exercise = state.queue.length > 0 ? exercises[state.queue[0]] : null
  const isLast = state.queue.length === 1

  // "Next lesson" stays inside the unit; only the unit's last lesson leads on to the next unit.
  const following = lessonAfter(lesson)
  const unitFinished = following === null || following.topic !== lesson.topic
  const next = following
    ? unitFinished
      ? {
          href: lessonHref(following),
          label: 'Next unit',
          note: `You finished ${unit.name}. Next up is the ${topicById(following.topic).title} unit.`,
        }
      : {
          href: lessonHref(following),
          label: 'Next lesson',
          note: `You unlocked the next lesson in ${unit.name}: ${following.title}.`,
        }
    : null

  // Record XP for the Achievements page alongside the lesson state change.
  const act = (action: LessonAction) => {
    setJustSaved(false)
    if (action.type === 'check' && action.correct && state.status === 'idle') {
      progressActions.correctAnswer()
    }
    if (action.type === 'next' && state.status === 'correct' && isLast) {
      // Finishing the lesson unlocks the next one and clears the saved place.
      progressActions.lessonCompleted(lesson.id)
    }
    dispatch(action)
  }

  const save = () => {
    // A question already answered correctly does not need to be asked again.
    const remaining = state.status === 'correct' ? state.queue.slice(1) : state.queue
    progressActions.saveLesson(lesson.id, remaining.length > 0 ? remaining : state.queue)
    setJustSaved(true)
  }

  const restart = () => {
    progressActions.clearSavedLesson(lesson.id)
    setJustSaved(false)
    dispatch({ type: 'restart', queue: orderedQueue(totalSteps) })
  }

  return (
    <AppShell current="lesson" eyebrow={unit.eyebrow} title={unit.heading}>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_285px]">
        <div className="min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:mb-1">
              <a
                href="#/topics"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-bold text-muted transition-colors hover:text-ink"
              >
                <Icon name="arrowLeft" size={16} />
                Back to path
              </a>
              {exercise && (
                <button
                  type="button"
                  onClick={save}
                  title="Save your place in this lesson"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 text-sm font-bold text-ink-soft transition-colors hover:border-slot-line hover:text-ink"
                >
                  <Icon name="save" size={17} />
                  Save
                </button>
              )}
              <span aria-live="polite" className="text-sm font-bold text-teal-text">
                {justSaved && (
                  <span className="inline-flex items-center gap-1">
                    <Icon name="check" size={15} strokeWidth={2.6} />
                    Saved
                  </span>
                )}
              </span>
            </div>
            <div className="w-full md:max-w-[440px]">
              <JourneyPath completed={completed} total={totalSteps} />
            </div>
          </div>

          <div className="pt-5">
            {exercise ? (
              <ExerciseCard
                title={lesson.title}
                tip={lesson.tip}
                exercise={exercise}
                placed={state.placed}
                status={state.status}
                nextLabel={isLast ? 'Finish lesson' : 'Continue'}
                canSkip={state.status !== 'correct' && state.queue.length > 1}
                dispatch={act}
              />
            ) : (
              <LessonComplete
                eyebrow={`${unit.name} · Lesson ${lesson.number} of ${unit.lessons.length}`}
                heading={unitFinished ? 'Unit complete' : 'Lesson complete'}
                title={lesson.title}
                total={totalSteps}
                note={next?.note ?? 'That was the last lesson of the last unit. Well done!'}
                nextHref={next?.href}
                nextLabel={next?.label}
                onRestart={restart}
              />
            )}
          </div>
        </div>

        <div className="xl:pt-12">
          <UnitPathPanel
            unit={unit}
            lesson={lesson}
            completed={completed}
            total={totalSteps}
            completedLessons={completedLessons}
          />
        </div>
      </div>
    </AppShell>
  )
}
