interface LogoProps {
  /** Show only the "GS" mark. */
  markOnly?: boolean
  /** Hide the wordmark below the `sm` breakpoint. */
  compactOnMobile?: boolean
  className?: string
}

export function Logo({ markOnly = false, compactOnMobile = false, className = '' }: LogoProps) {
  return (
    <a
      href="#/"
      aria-label="GrammarSpace home"
      className={`inline-flex shrink-0 items-center gap-2 rounded-lg ${className}`}
    >
      <span
        aria-hidden="true"
        className="font-logo grid h-[51px] w-[54px] place-items-center rounded-lg bg-primary text-2xl font-extrabold tracking-[0.05em] text-white"
      >
        GS
      </span>
      {!markOnly && (
        <span
          aria-hidden="true"
          className={`font-logo text-base font-semibold tracking-[0.05em] text-ink ${
            compactOnMobile ? 'hidden sm:inline' : ''
          }`}
        >
          GrammarSpace
        </span>
      )}
    </a>
  )
}
