import { useSyncExternalStore } from 'react'

/** Learner progress, kept in this browser only (localStorage). No account, no server. */
export interface Progress {
  xp: number
  correctAnswers: number
  lessonsCompleted: number
  bestStreak: number
  rulesRead: string[]
  /** Topic ids of finished lessons; finishing one unlocks the next. */
  completedLessons: string[]
  /** Saved place in a lesson: the exercise indexes still to answer, per topic id. */
  savedLessons: Record<string, number[]>
}

export const XP_PER_CORRECT = 10
export const XP_PER_LESSON = 40

const STORAGE_KEY = 'gs-progress'
const EMPTY: Progress = {
  xp: 0,
  correctAnswers: 0,
  lessonsCompleted: 0,
  bestStreak: 0,
  rulesRead: [],
  completedLessons: [],
  savedLessons: {},
}
const listeners = new Set<() => void>()

function load(): Progress {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? 'null',
    ) as Partial<Progress> | null
    if (!saved || typeof saved !== 'object') return EMPTY
    return {
      xp: Number(saved.xp) || 0,
      correctAnswers: Number(saved.correctAnswers) || 0,
      lessonsCompleted: Number(saved.lessonsCompleted) || 0,
      bestStreak: Number(saved.bestStreak) || 0,
      rulesRead: Array.isArray(saved.rulesRead) ? saved.rulesRead.map(String) : [],
      completedLessons: Array.isArray(saved.completedLessons)
        ? saved.completedLessons.map(String)
        : [],
      savedLessons: readSavedLessons(saved.savedLessons),
    }
  } catch {
    return EMPTY
  }
}

function readSavedLessons(value: unknown): Record<string, number[]> {
  if (!value || typeof value !== 'object') return {}
  const result: Record<string, number[]> = {}
  for (const [topic, queue] of Object.entries(value)) {
    if (Array.isArray(queue) && queue.every((item) => Number.isInteger(item) && item >= 0)) {
      result[topic] = queue
    }
  }
  return result
}

let current = load()

function update(change: (progress: Progress) => Progress) {
  current = change(current)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // Storage can be unavailable; progress then lasts for this visit only.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function withoutKey(record: Record<string, number[]>, key: string) {
  const copy = { ...record }
  delete copy[key]
  return copy
}

export const progressActions = {
  correctAnswer: () =>
    update((p) => ({ ...p, xp: p.xp + XP_PER_CORRECT, correctAnswers: p.correctAnswers + 1 })),
  lessonCompleted: (topic: string) =>
    update((p) => ({
      ...p,
      xp: p.xp + XP_PER_LESSON,
      lessonsCompleted: p.lessonsCompleted + 1,
      completedLessons: p.completedLessons.includes(topic)
        ? p.completedLessons
        : [...p.completedLessons, topic],
      savedLessons: withoutKey(p.savedLessons, topic),
    })),
  /** Remember where the learner is in a lesson so it can be resumed later. */
  saveLesson: (topic: string, queue: number[]) =>
    update((p) => ({ ...p, savedLessons: { ...p.savedLessons, [topic]: queue } })),
  clearSavedLesson: (topic: string) =>
    update((p) =>
      topic in p.savedLessons ? { ...p, savedLessons: withoutKey(p.savedLessons, topic) } : p,
    ),
  streak: (length: number) =>
    update((p) => (length > p.bestStreak ? { ...p, bestStreak: length } : p)),
  ruleRead: (id: string) =>
    update((p) => (p.rulesRead.includes(id) ? p : { ...p, rulesRead: [...p.rulesRead, id] })),
  reset: () => update(() => EMPTY),
}

/** Current progress outside React, for one-off reads such as restoring a saved lesson. */
export function readProgress(): Progress {
  return current
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => EMPTY,
  )
}
