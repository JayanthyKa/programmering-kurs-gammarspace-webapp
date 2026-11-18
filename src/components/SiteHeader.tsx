import { useProfile, useStartHref } from '../hooks/useProfile'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { ThemePicker } from './ThemePicker'

interface SiteHeaderProps {
  variant: 'home' | 'topics'
}

export function SiteHeader({ variant }: SiteHeaderProps) {
  const startHref = useStartHref()
  return (
    <header className="flex items-center justify-between gap-4">
      <Logo compactOnMobile />
      <div className="flex items-center gap-2 sm:gap-6">
        <ThemePicker />
        {variant === 'home' ? (
          <Button href={startHref}>Get started</Button>
        ) : (
          <>
            <a
              href="#/achievements"
              className="hidden min-h-11 items-center rounded-lg px-2 text-base text-ink transition-colors hover:text-primary-text sm:inline-flex"
            >
              Progress
            </a>
            <AccountBadge />
          </>
        )}
      </div>
    </header>
  )
}

/** Link to the profile page; shows the chosen avatar and nickname once they are set. */
export function AccountBadge() {
  const { name, avatar } = useProfile()
  return (
    <a
      href="#/profile"
      aria-label={name ? `Edit profile (${name})` : 'Set up your profile'}
      title={name ? `Edit profile (${name})` : 'Set up your profile'}
      className="inline-flex min-h-11 items-center gap-2 rounded-full p-0.5 text-primary-text transition-colors hover:bg-primary-tint"
    >
      {avatar ? (
        <Avatar id={avatar} size={40} />
      ) : (
        <span className="grid size-10 place-items-center">
          <Icon name="user" size={30} strokeWidth={1.7} />
        </span>
      )}
      {name && (
        <span
          aria-hidden="true"
          className="hidden max-w-32 truncate pr-3 text-sm font-bold text-ink md:inline"
        >
          {name}
        </span>
      )}
    </a>
  )
}
