import { useSyncExternalStore } from 'react'
import { isAvatarId } from '../data/avatars'
import type { AvatarId } from '../data/avatars'

/** The learner's nickname and avatar, kept in this browser only (localStorage). */
export interface Profile {
  name: string
  avatar: AvatarId | null
}

export const NAME_MAX_LENGTH = 16

const STORAGE_KEY = 'gs-profile'
const EMPTY: Profile = { name: '', avatar: null }
const listeners = new Set<() => void>()

function load(): Profile {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Profile> | null
    if (!saved || typeof saved !== 'object') return EMPTY
    return {
      name: typeof saved.name === 'string' ? saved.name.slice(0, NAME_MAX_LENGTH) : '',
      avatar: isAvatarId(saved.avatar) ? saved.avatar : null,
    }
  } catch {
    return EMPTY
  }
}

let current = load()

export function saveProfile(profile: Profile) {
  current = profile
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // Storage can be unavailable; the profile then lasts for this visit only.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useProfile(): Profile {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => EMPTY,
  )
}

/** Where "Get started" leads: the sign-in page first, or the topic menu once a profile exists. */
export function useStartHref(): string {
  return useProfile().name ? '#/topics' : '#/signin'
}
