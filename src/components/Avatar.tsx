import type { ReactNode } from 'react'
import type { AvatarId } from '../data/avatars'

const INK = '#263653'

const eyes = (y: number) => (
  <>
    <circle cx="25" cy={y} r="2.6" fill={INK} />
    <circle cx="39" cy={y} r="2.6" fill={INK} />
  </>
)

const smile = (d: string) => (
  <path d={d} fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
)

/** Hand-drawn avatar set, all on a 64 x 64 canvas with a tinted round background. */
const ART: Record<AvatarId, { background: string; art: ReactNode }> = {
  bear: {
    background: '#fff3d7',
    art: (
      <>
        <circle cx="18" cy="20" r="8" fill="#a9744f" />
        <circle cx="46" cy="20" r="8" fill="#a9744f" />
        <circle cx="32" cy="34" r="19" fill="#b9835c" />
        <ellipse cx="32" cy="41" rx="8" ry="6" fill="#f1dcc6" />
        <ellipse cx="32" cy="38.5" rx="3" ry="2" fill={INK} />
        {eyes(31)}
        {smile('M29 43q3 2.5 6 0')}
      </>
    ),
  },
  cat: {
    background: '#e6f2ff',
    art: (
      <>
        <path d="M14 27l2-17 14 9z" fill="#ef9a4a" />
        <path d="M50 27l-2-17-14 9z" fill="#ef9a4a" />
        <circle cx="32" cy="35" r="19" fill="#f6b26b" />
        <path d="M30 38.500h4l-2 2.500z" fill="#d9577a" />
        {eyes(33)}
        {smile('M28 43q2 2 4 0q2 2 4 0')}
        <path
          d="M12 37l8 1M12 42l8-1M52 37l-8 1M52 42l-8-1"
          stroke={INK}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  rabbit: {
    background: '#f0e9fc',
    art: (
      <>
        <ellipse cx="24" cy="15" rx="5.5" ry="12" fill="#ffffff" stroke="#d8d2e3" />
        <ellipse cx="40" cy="15" rx="5.5" ry="12" fill="#ffffff" stroke="#d8d2e3" />
        <ellipse cx="24" cy="16" rx="2.4" ry="8" fill="#f3b6c8" />
        <ellipse cx="40" cy="16" rx="2.4" ry="8" fill="#f3b6c8" />
        <circle cx="32" cy="39" r="17" fill="#ffffff" stroke="#d8d2e3" />
        <ellipse cx="32" cy="41" rx="2.6" ry="1.8" fill="#d9577a" />
        {eyes(36)}
        {smile('M28 45q4 3 8 0')}
      </>
    ),
  },
  frog: {
    background: '#e4f4f0',
    art: (
      <>
        <circle cx="21" cy="22" r="8.5" fill="#5bb974" />
        <circle cx="43" cy="22" r="8.5" fill="#5bb974" />
        <ellipse cx="32" cy="38" rx="21" ry="16" fill="#6cc784" />
        <circle cx="21" cy="22" r="4.8" fill="#ffffff" />
        <circle cx="43" cy="22" r="4.8" fill="#ffffff" />
        <circle cx="21" cy="22" r="2.4" fill={INK} />
        <circle cx="43" cy="22" r="2.4" fill={INK} />
        {smile('M20 41q12 9 24 0')}
      </>
    ),
  },
  owl: {
    background: '#fff3d7',
    art: (
      <>
        <path d="M14 22l3-11 10 6z" fill="#7b5c8c" />
        <path d="M50 22l-3-11-10 6z" fill="#7b5c8c" />
        <circle cx="32" cy="35" r="20" fill="#8d6e9c" />
        <circle cx="24" cy="32" r="8" fill="#ffffff" />
        <circle cx="40" cy="32" r="8" fill="#ffffff" />
        <circle cx="24" cy="32" r="3.2" fill={INK} />
        <circle cx="40" cy="32" r="3.2" fill={INK} />
        <path d="M28.500 39h7l-3.500 6z" fill="#f4c95d" />
      </>
    ),
  },
  robot: {
    background: '#e6f2ff',
    art: (
      <>
        <path d="M32 17v-6" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="9" r="3" fill="#f17c67" />
        <rect x="9" y="29" width="5" height="9" rx="2" fill="#7f93ab" />
        <rect x="50" y="29" width="5" height="9" rx="2" fill="#7f93ab" />
        <rect x="14" y="17" width="36" height="33" rx="9" fill="#a9bbd0" />
        <circle cx="25" cy="31" r="5" fill="#ffffff" />
        <circle cx="39" cy="31" r="5" fill="#ffffff" />
        <circle cx="25" cy="31" r="2.2" fill={INK} />
        <circle cx="39" cy="31" r="2.2" fill={INK} />
        <rect x="24" y="40.500" width="16" height="4" rx="2" fill={INK} />
      </>
    ),
  },
  fox: {
    background: '#e4f4f0',
    art: (
      <>
        <path d="M13 28l1-18 14 10z" fill="#e2772f" />
        <path d="M51 28l-1-18-14 10z" fill="#e2772f" />
        <path d="M12 29q20-12 40 0l-7 15q-13 13-26 0z" fill="#ef8a45" />
        <path d="M19 44q13 13 26 0l-6-7q-7 5-14 0z" fill="#fff6ec" />
        <circle cx="32" cy="46" r="2.5" fill={INK} />
        {eyes(33)}
      </>
    ),
  },
  panda: {
    background: '#f0e9fc',
    art: (
      <>
        <circle cx="18" cy="19" r="7.5" fill={INK} />
        <circle cx="46" cy="19" r="7.5" fill={INK} />
        <circle cx="32" cy="35" r="19" fill="#ffffff" stroke="#d8dce5" />
        <ellipse cx="24.500" cy="33" rx="5.5" ry="6.5" fill={INK} transform="rotate(18 24.5 33)" />
        <ellipse cx="39.500" cy="33" rx="5.5" ry="6.5" fill={INK} transform="rotate(-18 39.5 33)" />
        <circle cx="25" cy="33" r="2" fill="#ffffff" />
        <circle cx="39" cy="33" r="2" fill="#ffffff" />
        <ellipse cx="32" cy="40.500" rx="2.8" ry="1.9" fill={INK} />
        {smile('M28.5 44.5q3.5 2.500 7 0')}
      </>
    ),
  },
}

interface AvatarProps {
  id: AvatarId
  /** Size in pixels. */
  size?: number
  className?: string
}

/** Decorative; label the control or text next to it. */
export function Avatar({ id, size = 48, className }: AvatarProps) {
  const { background, art } = ART[id]
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
    >
      <circle cx="32" cy="32" r="32" fill={background} />
      {art}
    </svg>
  )
}
