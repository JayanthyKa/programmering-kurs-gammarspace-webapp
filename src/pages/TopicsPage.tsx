import type { ReactNode } from 'react'
import tapeUrl from '../assets/tape.svg'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { TOPICS } from '../data/topics'
import type { Topic } from '../data/topics'
import { UNITS, lessonHref } from '../data/units'
import { useProgress } from '../hooks/useProgress'
import { currentLessonInUnit, isUnitComplete } from '../lesson/lessonOrder'

const CARD = 'flex h-full flex-col gap-7 rounded-2xl border border-transparent px-7 py-6 sm:px-10'

export function TopicsPage() {
  const { completedLessons, savedLessons } = useProgress()

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1346px] flex-col px-5 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <SiteHeader variant="topics" />

      <main className="flex-1 py-12 sm:py-16">
        <h1 className="sr-only">Choose a topic</h1>
        <div className="relative mx-auto max-w-[1210px]">
          <ol className="grid gap-6 rounded-2xl bg-surface p-5 shadow-card sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 sm:p-8 lg:gap-x-24 lg:p-12 xl:gap-x-44">
            {TOPICS.map((topic) => {
              const { lessons } = UNITS[topic.id]
              const current = currentLessonInUnit(topic.id, completedLessons)
              const finished = lessons.filter((lesson) => completedLessons.includes(lesson.id))
              const started = finished.length > 0 || current.id in savedLessons
              return (
                <li key={topic.id}>
                  <a
                    href={lessonHref(current)}
                    className={`${CARD} ${topic.cardClass} transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                  >
                    <CardText topic={topic} />
                    {isUnitComplete(topic.id, completedLessons) ? (
                      <Status icon="check">
                        All {lessons.length} lessons completed. Open to practise again.
                      </Status>
                    ) : started ? (
                      <Status icon="play">
                        Continue: lesson {current.number} of {lessons.length}
                      </Status>
                    ) : (
                      <Status icon="arrowRight">Start: {lessons.length} lessons</Status>
                    )}
                  </a>
                </li>
              )
            })}
          </ol>
          <img
            src={tapeUrl}
            alt=""
            className="pointer-events-none absolute -top-7 -right-6 h-auto w-24 rotate-[42deg] sm:-right-9 sm:w-[120px]"
          />
          <img
            src={tapeUrl}
            alt=""
            className="pointer-events-none absolute -bottom-7 -left-6 h-auto w-24 rotate-[42deg] sm:-left-9 sm:w-[120px]"
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function CardText({ topic }: { topic: Topic }) {
  return (
    <>
      <span aria-hidden="true" className={`text-2xl ${topic.markClass}`}>
        {topic.mark}
      </span>
      <span className="text-xl text-ink">{topic.title}</span>
      <span className="text-base text-ink-soft">{topic.description}</span>
    </>
  )
}

function Status({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className="-mt-2 inline-flex items-center gap-2 text-sm font-bold text-ink">
      <Icon name={icon} size={17} strokeWidth={2.2} className="shrink-0" />
      <span>{children}</span>
    </span>
  )
}
