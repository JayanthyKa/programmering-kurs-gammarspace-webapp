import type { ReactNode, Ref } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const BASE =
  'inline-flex min-h-11 shrink-0 whitespace-nowrap items-center justify-center gap-2.5 rounded-lg px-4 py-2 text-[15px] font-semibold tracking-[0.02em] transition-colors'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-off disabled:text-off-text',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-sunken',
  ghost: 'px-2 text-muted hover:text-ink',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  /** Renders a link instead of a button. */
  href?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
  ref?: Ref<HTMLButtonElement>
}

export function Button({
  children,
  variant = 'primary',
  href,
  disabled,
  onClick,
  className = '',
  ref,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
