import { useReducer, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { ExerciseCard } from '../components/lesson/ExerciseCard'
import { PRACTICE } from '../data/practice'
import { TOPICS, topicById } from '../data/topics'
import type { TopicId } from '../data/topics'
import { progressActions, useProgress } from '../hooks/useProgress'
import { createLessonState, lessonReducer, shuffledQueue } from '../lesson/lessonState'
import type { LessonAction } from '../lesson/lessonState'

export function PracticePage() {
  const [topicId, setTopicId] = useState<TopicId>('sentence')
  const [streak, setStreak] = useState(0)
  const [answered, setAnswered] = useState(0)
  const { bestStreak } = useProgress()
  const pool = PRACTICE[topicId]
  const [state, dispatch] = useReducer(lessonReducer, pool.length, (count) =>
    createLessonState(shuffledQueue(count)),
  )
  const exercise = pool[state.queue[0]]

  const chooseTopic = (id: TopicId) => {
    setTopicId(id)
    dispatch({ type: 'restart', queue: shuffledQueue(PRACTICE[id].length) })
  }

  const act = (action: LessonAction) => {
    if (action.type === 'check' && state.status === 'idle' && state.placed !== null) {
      if (action.correct) {
        const next = streak + 1
        setStreak(next)
        setAnswered((count) => count + 1)
        progressActions.correctAnswer()
        progressActions.streak(next)
      } else {
        setStreak(0)
      }
    }
    // Practice never ends: when the last question is answered, deal a fresh round.
    if (action.type === 'next' && state.status === 'correct' && state.queue.length === 1) {
      dispatch({ type: 'restart', queue: shuffledQueue(pool.length) })
      return
    }
    dispatch(action)
  }

  return (
    <AppShell current="practice" eyebrow="Practice" title="Quick rounds, no pressure">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_285px]">
        <div className="min-w-0">
          <div
            role="group"
            aria-label="Choose a topic to practise"
            className="flex flex-wrap gap-2"
          >
            {TOPICS.map((topic) => {
              const active = topic.id === topicId
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseTopic(topic.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm font-bold transition-colors ${
                    active
                      ? 'border-primary-text bg-primary-tint text-primary-text'
                      : 'border-line-strong bg-surface text-ink-soft hover:border-slot-line hover:text-ink'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-7 min-w-7 place-items-center rounded-md px-1 text-xs font-semibold ${topic.cardClass} ${topic.markClass}`}
                  >
                    {topic.mark}
                  </span>
                  {topic.title}
                </button>
              )
            })}
          </div>

          <div className="pt-5">
            <ExerciseCard
              title={`${topicById(topicId).title} practice`}
              exercise={exercise}
              placed={state.placed}
              status={state.status}
              nextLabel="Next question"
              canSkip={state.status !== 'correct'}
              dispatch={act}
            />
          </div>
        </div>

        <aside
          aria-labelledby="streak-title"
          className="self-start rounded-2xl border border-line bg-surface p-5 sm:p-[22px]"
        >
          <p className="text-xs font-extrabold tracking-[0.12em] text-primary-text uppercase">
            This round
          </p>
          <h2 id="streak-title" className="font-display pt-0.5 text-lg font-semibold text-ink">
            Your streak
          </h2>
          <dl className="mt-4 grid grid-cols-3 gap-2 xl:grid-cols-1">
            <Stat icon="flame" label="In a row" value={streak} tone="sun" live />
            <Stat icon="trophy" label="Best streak" value={bestStreak} tone="lav" />
            <Stat icon="check" label="Correct so far" value={answered} tone="teal" />
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Every correct answer earns 10 XP. A wrong answer resets your streak, but you can always
            try again.
          </p>
        </aside>
      </div>
    </AppShell>
  )
}

const TONES = {
  sun: 'bg-sun-tint text-sun-text',
  lav: 'bg-lav-tint text-lav-text',
  teal: 'bg-teal-tint text-teal-text',
}

function Stat({
  icon,
  label,
  value,
  tone,
  live = false,
}: {
  icon: IconName
  label: string
  value: number
  tone: keyof typeof TONES
  live?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-start gap-1 rounded-[10px] p-3 xl:flex-row xl:items-center xl:gap-3 ${TONES[tone]}`}
    >
      <Icon name={icon} size={22} className="shrink-0" />
      <dt className="order-2 text-xs font-bold xl:order-none xl:flex-1 xl:text-sm">{label}</dt>
      <dd
        aria-live={live ? 'polite' : undefined}
        className="font-display text-2xl leading-none font-bold"
      >
        {value}
      </dd>
    </div>
  )
}
