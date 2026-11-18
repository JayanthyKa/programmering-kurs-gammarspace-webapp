import { useState } from 'react'
import type { FormEvent } from 'react'
import { AppShell } from '../components/AppShell'
import { Avatar } from '../components/Avatar'
import { AVATARS } from '../data/avatars'
import type { AvatarId } from '../data/avatars'
import { Icon } from '../components/Icon'
import { NAME_MAX_LENGTH, saveProfile, useProfile } from '../hooks/useProfile'
import { useProgress } from '../hooks/useProgress'

const NAME_MIN_LENGTH = 2
// Letters (any language), numbers, spaces, hyphens and underscores.
const NAME_PATTERN = /^[\p{L}\p{N} _-]+$/u

function validateName(name: string): string | null {
  if (name.length < NAME_MIN_LENGTH) return `Use at least ${NAME_MIN_LENGTH} characters.`
  if (!NAME_PATTERN.test(name)) return 'Use only letters, numbers, spaces, - and _.'
  return null
}

export function ProfilePage() {
  const profile = useProfile()
  const { xp } = useProgress()
  const [name, setName] = useState(profile.name)
  const [avatar, setAvatar] = useState<AvatarId | null>(profile.avatar)
  const [error, setError] = useState<string | null>(null)

  const trimmed = name.trim().replace(/\s+/g, ' ')
  const unchanged = trimmed === profile.name && avatar === profile.avatar

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const problem = validateName(trimmed)
    setError(problem)
    if (problem) return
    saveProfile({ name: trimmed, avatar })
    // Saving the profile leads on to the topic menu.
    window.location.hash = '#/topics'
  }

  return (
    <AppShell current="profile" eyebrow="Profile" title="Make it yours">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_285px]">
        <form
          noValidate
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-surface shadow-card"
        >
          <div className="border-b border-line px-5 py-5 sm:px-7 sm:py-6">
            <label htmlFor="profile-name" className="font-display text-lg font-semibold text-ink">
              Your username
            </label>
            <p id="profile-name-help" className="pt-1 text-sm leading-relaxed text-muted">
              Pick a nickname, not your real full name. {NAME_MIN_LENGTH} to {NAME_MAX_LENGTH}{' '}
              characters.
            </p>
            <input
              id="profile-name"
              type="text"
              value={name}
              maxLength={NAME_MAX_LENGTH}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={
                error ? 'profile-name-help profile-name-error' : 'profile-name-help'
              }
              aria-invalid={error ? true : undefined}
              onChange={(event) => {
                setName(event.target.value)
                setError(null)
              }}
              className={`mt-3 block h-12 w-full max-w-sm rounded-lg border-2 bg-surface px-3.5 text-base font-semibold text-ink placeholder:font-normal placeholder:text-muted ${
                error ? 'border-coral' : 'border-line-strong focus:border-primary-text'
              }`}
              placeholder="For example: StarReader"
            />
            {error && (
              <p
                id="profile-name-error"
                className="flex items-center gap-1.5 pt-2 text-sm font-semibold text-coral-text"
              >
                <Icon name="x" size={16} strokeWidth={2.5} />
                {error}
              </p>
            )}
          </div>

          <fieldset className="px-5 py-5 sm:px-7 sm:py-6">
            <legend className="font-display text-lg font-semibold text-ink">
              Choose an avatar
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AVATARS.map((option) => {
                const selected = option.id === avatar
                return (
                  <label
                    key={option.id}
                    className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-sm font-bold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-text ${
                      selected
                        ? 'border-primary-text bg-primary-tint text-primary-text'
                        : 'border-line bg-surface text-ink-soft hover:border-slot-line'
                    }`}
                  >
                    <input
                      type="radio"
                      name="avatar"
                      value={option.id}
                      checked={selected}
                      onChange={() => {
                        setAvatar(option.id)
                      }}
                      className="sr-only"
                    />
                    <Avatar id={option.id} size={72} />
                    {option.label}
                    {selected && (
                      <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-primary text-white">
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-7">
            <a
              href="#/topics"
              className="inline-flex min-h-11 items-center rounded-lg px-2 text-[15px] font-semibold text-muted transition-colors hover:text-ink"
            >
              {profile.name ? 'Back to topics' : 'Skip for now'}
            </a>
            <button
              type="submit"
              disabled={unchanged && !error}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-lg bg-primary px-4 py-2 text-[15px] font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-off disabled:text-off-text"
            >
              Save profile
            </button>
          </div>
        </form>

        <aside
          aria-labelledby="preview-title"
          className="self-start rounded-2xl border border-line bg-surface p-5 text-center sm:p-[22px]"
        >
          <p className="text-xs font-extrabold tracking-[0.12em] text-primary-text uppercase">
            Preview
          </p>
          <h2 id="preview-title" className="sr-only">
            Profile preview
          </h2>
          <div className="mt-4 flex justify-center">
            {avatar ? (
              <Avatar id={avatar} size={112} />
            ) : (
              <span className="grid size-28 place-items-center rounded-full bg-sunken text-muted">
                <Icon name="user" size={56} strokeWidth={1.4} />
              </span>
            )}
          </div>
          <p className="font-display pt-4 text-xl font-bold break-words text-ink">
            {trimmed || 'Your name here'}
          </p>
          <p className="inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-sun-text">
            <Icon name="star" size={16} />
            {xp} XP
          </p>
          <p className="pt-4 text-sm leading-relaxed text-muted">
            Your profile is saved on this device only. Nobody else can see it.
          </p>
        </aside>
      </div>
    </AppShell>
  )
}
