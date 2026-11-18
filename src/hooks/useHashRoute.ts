import { useSyncExternalStore } from 'react'
import { TOPICS } from '../data/topics'
import type { TopicId } from '../data/topics'

export type Route =
  'home' | 'topics' | 'lesson' | 'library' | 'practice' | 'achievements' | 'profile' | 'signin'

const ROUTES: Record<string, Route> = {
  '#/': 'home',
  '#/topics': 'topics',
  '#/lesson': 'lesson',
  '#/library': 'library',
  '#/practice': 'practice',
  '#/achievements': 'achievements',
  '#/profile': 'profile',
  '#/signin': 'signin',
}

const LESSON_PREFIX = '#/lesson/'

function readRoute(): Route {
  const hash = window.location.hash
  if (hash.startsWith(LESSON_PREFIX)) return 'lesson'
  return ROUTES[hash] ?? 'home'
}

/**
 * The lesson named in the address as "topic/number": `#/lesson/tense/2` gives "tense/2".
 * The number is 0 when the address names only the unit (`#/lesson/tense`).
 */
function readLessonRef(): string {
  const hash = window.location.hash
  const [id, number] = hash.startsWith(LESSON_PREFIX)
    ? hash.slice(LESSON_PREFIX.length).split('/')
    : []
  const topic = TOPICS.find((item) => item.id === id)?.id ?? TOPICS[0].id
  return `${topic}/${Number.parseInt(number ?? '', 10) || 0}`
}

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

/** Minimal hash router: a handful of screens does not justify a routing dependency. */
export function useHashRoute(): Route {
  return useSyncExternalStore(subscribe, readRoute, () => 'home' as Route)
}

export function useLessonRef(): { topic: TopicId; number: number } {
  const ref = useSyncExternalStore(subscribe, readLessonRef, () => `${TOPICS[0].id}/0`)
  const [topic, number] = ref.split('/')
  return { topic: topic as TopicId, number: Number(number) }
}
