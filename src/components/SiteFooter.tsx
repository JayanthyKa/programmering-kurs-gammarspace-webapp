import { Logo } from './Logo'

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-muted/50 p-6 text-center text-base text-muted sm:flex-row sm:justify-between sm:text-left">
      <Logo markOnly />
      <p className="tracking-[0.05em]">Small lessons, big difference.</p>
      <p>Contact us</p>
    </footer>
  )
}
