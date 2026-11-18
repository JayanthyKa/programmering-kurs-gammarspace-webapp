import { TOPICS } from '../data/topics'
import type { TopicId } from '../data/topics'
import { UNITS } from '../data/units'
import type { UnitLesson } from '../data/units'

/** Every lesson in the order the path suggests: all lessons of the first unit, then the next. */
export const ALL_LESSONS: UnitLesson[] = TOPICS.flatMap((topic) => UNITS[topic.id].lessons)

/**
 * Every unit can be opened at any time. Inside a unit the first lesson is open and each
 * later lesson opens once the lesson before it is finished.
 */
export function isLessonUnlocked(lesson: UnitLesson, completedLessons: string[]): boolean {
  const { lessons } = UNITS[lesson.topic]
  const index = lessons.indexOf(lesson)
  return index <= 0 || completedLessons.includes(lessons[index - 1].id)
}

export function isUnitComplete(topic: TopicId, completedLessons: string[]): boolean {
  return UNITS[topic].lessons.every((lesson) => completedLessons.includes(lesson.id))
}

/** The lesson to do next inside a unit: the first unfinished one, or the first if all are done. */
export function currentLessonInUnit(topic: TopicId, completedLessons: string[]): UnitLesson {
  const { lessons } = UNITS[topic]
  return lessons.find((lesson) => !completedLessons.includes(lesson.id)) ?? lessons[0]
}

/** The lesson that follows this one, in the same unit or at the start of the next unit. */
export function lessonAfter(lesson: UnitLesson): UnitLesson | null {
  return ALL_LESSONS[ALL_LESSONS.indexOf(lesson) + 1] ?? null
}
