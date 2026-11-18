import { AppShell } from '../components/AppShell'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'
import { RULES } from '../data/rules'
import { useProgress } from '../hooks/useProgress'
import type { Progress } from '../hooks/useProgress'

interface Badge {
  id: string
  title: string
  how: string
  icon: IconName
  /** Progress towards the badge as [current, goal]. */
  measure: (progress: Progress) => [number, number]
}

const REWARD_XP = 200

const BADGES: Badge[] = [
  {
    id: 'first-steps',
    title: 'First steps',
    how: 'Get your first answer right',
    icon: 'check',
    measure: (p) => [p.correctAnswers, 1],
  },
  {
    id: 'path-finder',
    title: 'Path finder',
    how: 'Finish a lesson journey',
    icon: 'target',
    measure: (p) => [p.lessonsCompleted, 1],
  },
  {
    id: 'on-a-roll',
    title: 'On a roll',
    how: 'Get 5 in a row in Practice',
    icon: 'flame',
    measure: (p) => [p.bestStreak, 5],
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    how: 'Read 4 rules in the Library',
    icon: 'book',
    measure: (p) => [p.rulesRead.length, 4],
  },
  {
    id: 'word-wizard',
    title: 'Word wizard',
    how: 'Get 25 answers right',
    icon: 'sparkle',
    measure: (p) => [p.correctAnswers, 25],
  },
  {
    id: 'grammar-explorer',
    title: 'Grammar Explorer',
    how: `Earn ${REWARD_XP} XP`,
    icon: 'trophy',
    measure: (p) => [p.xp, REWARD_XP],
  },
]

export function AchievementsPage() {
  const progress = useProgress()
  const earned = BADGES.filter((badge) => {
    const [value, goal] = badge.measure(progress)
    return value >= goal
  }).length
  const rewardPercent = Math.min(100, Math.round((progress.xp / REWARD_XP) * 100))
  const started = progress.xp > 0 || progress.rulesRead.length > 0

  return (
    <AppShell current="achievements" eyebrow="Achievements" title="Look how far you have come">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon="star" label="XP earned" value={progress.xp} tone="bg-sun-tint text-sun-text" />
        <Stat
          icon="check"
          label="Correct answers"
          value={progress.correctAnswers}
          tone="bg-teal-tint text-teal-text"
        />
        <Stat
          icon="target"
          label="Lessons finished"
          value={progress.lessonsCompleted}
          tone="bg-primary-tint text-primary-text"
        />
        <Stat
          icon="flame"
          label="Best streak"
          value={progress.bestStreak}
          tone="bg-coral-tint text-coral-text"
        />
      </dl>

      <section
        aria-labelledby="reward-title"
        className="mt-5 flex flex-col gap-4 rounded-2xl bg-lav-tint p-5 text-lav-text sm:flex-row sm:items-center sm:p-6"
      >
        <Icon name="trophy" size={40} strokeWidth={1.6} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold tracking-[0.1em] uppercase">Next reward</p>
          <h2 id="reward-title" className="font-display text-xl font-bold">
            Grammar Explorer
          </h2>
          <div
            role="progressbar"
            aria-label="Progress to Grammar Explorer"
            aria-valuemin={0}
            aria-valuemax={REWARD_XP}
            aria-valuenow={Math.min(progress.xp, REWARD_XP)}
            aria-valuetext={`${Math.min(progress.xp, REWARD_XP)} of ${REWARD_XP} XP`}
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface"
          >
            <div
              className="h-full rounded-full bg-[#8a5fd8] transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${rewardPercent}%` }}
            />
          </div>
        </div>
        <p className="shrink-0 text-sm font-bold">
          {Math.min(progress.xp, REWARD_XP)} / {REWARD_XP} XP
        </p>
      </section>

      <section aria-labelledby="badges-title" className="mt-7">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="badges-title" className="font-display text-xl font-semibold text-ink">
            Badges
          </h2>
          <p className="text-sm text-muted">
            <strong className="font-bold text-ink">
              {earned} of {BADGES.length}
            </strong>{' '}
            earned
          </p>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {BADGES.map((badge) => {
            const [value, goal] = badge.measure(progress)
            const done = value >= goal
            return (
              <li
                key={badge.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card"
              >
                <span
                  className="journey-disc shrink-0"
                  data-state={done ? 'done' : 'future'}
                  style={{ width: '3.25rem', height: '3.25rem' }}
                >
                  <Icon name={done ? badge.icon : 'lock'} size={24} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-ink">{badge.title}</h3>
                  <p className="pt-0.5 text-sm text-ink-soft">{badge.how}</p>
                  <p
                    className={`pt-1.5 text-xs font-bold ${done ? 'text-teal-text' : 'text-muted'}`}
                  >
                    {done ? 'Earned' : `${Math.min(value, goal)} of ${goal}`}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {!started && (
        <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-line-strong p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-ink-soft">
            Nothing here yet. Answer your first question to start collecting XP and badges.
          </p>
          <Button href="#/topics">
            Start a lesson
            <Icon name="arrowRight" size={18} />
          </Button>
        </div>
      )}

      <p className="mt-7 text-sm text-muted">
        Your progress is saved on this device only. {RULES.length} library rules, 13 lessons and 16
        practice questions are available so far.
      </p>
    </AppShell>
  )
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: IconName
  label: string
  value: number
  tone: string
}) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl p-4 sm:p-5 ${tone}`}>
      <Icon name={icon} size={28} strokeWidth={1.8} className="shrink-0" />
      <div className="flex min-w-0 flex-col-reverse">
        <dt className="text-sm font-bold">{label}</dt>
        <dd className="font-display text-3xl leading-none font-bold">{value}</dd>
      </div>
    </div>
  )
}
