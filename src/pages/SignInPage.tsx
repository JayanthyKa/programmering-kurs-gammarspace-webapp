import { useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Logo'
import { SiteFooter } from '../components/SiteFooter'
import { ThemePicker } from '../components/ThemePicker'

/**
 * Entry page after "Get started". There are no accounts yet: guests go on to set up a
 * profile on this device, and the login button only explains that accounts are coming.
 */
export function SignInPage() {
  const [showAccountNote, setShowAccountNote] = useState(false)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1346px] flex-col px-5 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <header className="flex items-center justify-between gap-4">
        <Logo compactOnMobile />
        <ThemePicker />
      </header>

      <main className="grid flex-1 place-items-center py-12 sm:py-16">
        <section
          aria-labelledby="signin-title"
          className="w-full max-w-md rounded-2xl border border-line bg-surface px-6 py-10 text-center shadow-card sm:px-10 sm:py-12"
        >
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-tint text-primary-text">
            <Icon name="user" size={36} strokeWidth={1.6} />
          </span>
          <h1 id="signin-title" className="font-display mt-6 text-3xl font-bold text-ink">
            Welcome to GrammarSpace
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-ink-soft">
            Choose how you want to start learning.
          </p>

          <div className="mt-8 grid gap-3">
            <Button href="#/profile" className="w-full">
              Continue as guest
              <Icon name="arrowRight" size={18} />
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => setShowAccountNote(true)}>
              Log in / Sign up
            </Button>
          </div>

          <p aria-live="polite" className="mt-4 empty:mt-0">
            {showAccountNote && (
              <span className="block rounded-[10px] border border-sun-line bg-sun-tint px-3.5 py-3 text-left text-sm leading-snug text-sun-text">
                <strong className="font-bold">Accounts are coming soon.</strong> For now, continue
                as a guest. Your name, avatar and progress are saved on this device.
              </span>
            )}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            As a guest you pick a nickname and an avatar. Nothing is sent anywhere.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
