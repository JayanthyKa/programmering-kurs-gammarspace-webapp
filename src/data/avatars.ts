/** Avatars a learner can choose from. The drawings live in components/Avatar.tsx. */
export const AVATARS = [
  { id: 'bear', label: 'Bear' },
  { id: 'cat', label: 'Cat' },
  { id: 'rabbit', label: 'Rabbit' },
  { id: 'frog', label: 'Frog' },
  { id: 'owl', label: 'Owl' },
  { id: 'robot', label: 'Robot' },
  { id: 'fox', label: 'Fox' },
  { id: 'panda', label: 'Panda' },
] as const

export type AvatarId = (typeof AVATARS)[number]['id']

export function isAvatarId(value: unknown): value is AvatarId {
  return AVATARS.some((avatar) => avatar.id === value)
}
