import tapeUrl from '../assets/tape.svg'
import underlineUrl from '../assets/underline.svg'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { useStartHref } from '../hooks/useProfile'

export function HomePage() {
  const startHref = useStartHref()
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1346px] flex-col px-5 py-6 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <SiteHeader variant="home" />

      <main className="grid flex-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16 lg:py-20">
        <div className="max-w-[440px]">
          <h1 className="font-display text-[clamp(2.75rem,7vw+1rem,4rem)] leading-[1.3] font-bold tracking-[0.05em] text-ink">
            Write with
            <br />
            <span className="relative inline-block text-primary-text">
              clarity
              <img
                src={underlineUrl}
                alt=""
                className="absolute -bottom-0.5 left-0 h-[0.16em] w-full"
              />
            </span>
            .
          </h1>
          <p className="mt-10 text-base leading-relaxed tracking-[0.05em] text-ink sm:mt-14">
            Short, focused lessons that turn confusing grammar rules into skills you’ll use every
            day.
          </p>
          <Button href={startHref} className="mt-10">
            Start Learning
          </Button>
        </div>

        <HeroPreview />
      </main>

      <SiteFooter />
    </div>
  )
}

/** Decorative preview of a solved exercise, taped to the page like a note. */
function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px] select-none">
      <div className="relative aspect-[10/9] -rotate-3 rounded-[52%_48%_56%_44%/50%_56%_44%_50%] bg-primary-tint">
        <span className="absolute top-[7%] right-0 size-[21%] rounded-full bg-sun/70" />
        <span className="absolute bottom-[16%] left-[1%] size-[15%] rounded-full bg-[#c6b4df]/65" />

        <div className="absolute inset-x-[3%] top-[10%] rotate-[7deg] rounded-xl border border-dashed border-line-strong bg-surface px-[5.5%] py-[7%] shadow-card">
          <p className="text-[10px] font-extrabold tracking-[0.11em] text-muted uppercase">
            Your sentence
          </p>
          <p className="font-display mt-3 text-[clamp(1.125rem,4.6vw,1.5625rem)] leading-[1.9] tracking-[-0.02em] text-ink">
            Neither of the reports{' '}
            <span className="mx-1 inline-flex h-[2.6rem] min-w-[6.5rem] items-center justify-center gap-2 rounded-[9px] bg-teal-deep px-3 align-middle text-[15px] font-bold tracking-normal text-white shadow-[0_5px_6px_rgb(66_99_216/0.14)]">
              is
              <Icon name="check" size={17} strokeWidth={2.2} />
            </span>{' '}
            complete.
          </p>
          <div className="mt-4 flex items-start gap-3 rounded-[10px] bg-teal-tint p-3">
            <span className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-teal-deep text-white">
              <Icon name="check" size={18} strokeWidth={2.4} />
            </span>
            <span className="text-[11px] leading-snug text-teal-text sm:text-xs">
              <strong className="block font-bold">Exactly right!</strong>
              “Neither” is singular, so it takes the singular verb “is.”
            </span>
          </div>
        </div>

        <img
          src={tapeUrl}
          alt=""
          className="absolute -top-[1%] -left-[2%] h-auto w-[26%] rotate-[-31deg]"
        />
        <img
          src={tapeUrl}
          alt=""
          className="absolute -right-[4%] bottom-[5%] h-auto w-[26%] rotate-[-31deg]"
        />
      </div>
    </div>
  )
}
