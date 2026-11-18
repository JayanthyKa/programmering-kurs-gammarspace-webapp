import type { Exercise } from './exercises'
import { LESSONS } from './lessons'
import { MORE_LESSONS, OPENING_LESSONS } from './moreLessons'
import { TOPICS } from './topics'
import type { TopicId } from './topics'

/** One playable lesson: six exercises and a journey path. */
export interface UnitLesson {
  /** Stable id used for progress, e.g. "tense/2". */
  id: string
  topic: TopicId
  /** Position in its unit, starting at 1. */
  number: number
  title: string
  tip: string
  exercises: Exercise[]
}

/**
 * A topic card is a unit: its lessons in order, sometimes after a short intro that is
 * shown as already done.
 */
export interface Unit {
  topic: TopicId
  /** Small label above the page heading, e.g. "Word classes · Unit 1". */
  eyebrow: string
  heading: string
  /** Short name such as "Unit 1". */
  name: string
  intro: { title: string; detail: string } | null
  lessons: UnitLesson[]
}

function buildUnit(topic: TopicId): Unit {
  const first = LESSONS[topic]
  const opening = OPENING_LESSONS[topic]
  const contents = [...(opening ? [opening] : []), first, ...MORE_LESSONS[topic]]
  return {
    topic,
    eyebrow: first.eyebrow,
    heading: first.heading,
    name: first.unit,
    // A unit that opens with a real lesson has no ready-made intro.
    intro: opening ? null : (first.done ?? null),
    lessons: contents.map((content, index) => ({
      id: `${topic}/${index + 1}`,
      topic,
      number: index + 1,
      title: content.title,
      tip: content.tip,
      exercises: content.exercises,
    })),
  }
}

export const UNITS = Object.fromEntries(
  TOPICS.map((topic) => [topic.id, buildUnit(topic.id)]),
) as Record<TopicId, Unit>

export function lessonHref(lesson: UnitLesson): string {
  return `#/lesson/${lesson.id}`
}
