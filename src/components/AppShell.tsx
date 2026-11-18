import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'
import { Logo } from './Logo'
import { AccountBadge } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { ThemePicker } from './ThemePicker'

export type AppSection = 'lesson' | 'library' | 'practice' | 'achievements' | 'profile'

const NAV: { id: AppSection; href: string; label: string; icon: IconName }[] = [
  // Learn opens the topic chooser; every topic has its own lesson.
  { id: 'lesson', href: '#/topics', label: 'Learn', icon: 'grid' },
  { id: 'library', href: '#/library', label: 'Library', icon: 'book' },
  { id: 'practice', href: '#/practice', label: 'Practice', icon: 'target' },
  { id: 'achievements', href: '#/achievements', label: 'Achievements', icon: 'trophy' },
]

interface AppShellProps {
  current: AppSection
  eyebrow: string
  title: string
  children: ReactNode
}

/**
 * Frame shared by the signed-in style pages: navigation (left rail on desktop, top bar
 * on tablet and mobile), a page header with the theme picker, and the site footer.
 */
export function AppShell({ current, eyebrow, title, children }: AppShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1346px] px-0 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
      <div className="border-line bg-page sm:rounded-xl sm:border lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:rounded-t-xl lg:flex-col lg:items-stretch lg:justify-start lg:rounded-tr-none lg:rounded-l-xl lg:border-r lg:border-b-0 lg:px-[18px] lg:pt-7 lg:pb-5">
          <Logo compactOnMobile />
          <nav aria-label="Main" className="lg:pt-9">
            <ul className="flex gap-1 lg:flex-col lg:gap-[7px]">
              {NAV.map((item) => {
                const active = item.id === current
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-bold transition-colors lg:h-[46px] lg:w-full ${
                        active
                          ? 'bg-primary-tint text-primary-text'
                          : 'text-muted hover:bg-sunken hover:text-ink'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span className="sr-only md:not-sr-only">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="min-w-0">
          <header className="flex min-h-[84px] items-center justify-between gap-4 border-b border-line bg-surface px-5 py-3 sm:px-8 lg:rounded-tr-xl">
            <div>
              <p className="text-xs font-extrabold tracking-[0.12em] text-primary-text uppercase">
                {eyebrow}
              </p>
              <h1 className="font-display pt-0.5 text-lg font-semibold text-ink sm:text-xl">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
              <ThemePicker />
              <AccountBadge />
            </div>
          </header>

          <main className="px-4 py-6 sm:px-8 sm:py-7">{children}</main>
        </div>
      </div>

      <div className="px-4 pt-3 sm:px-0">
        <SiteFooter />
      </div>
    </div>
  )
}
