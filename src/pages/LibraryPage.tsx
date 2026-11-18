import { useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Icon } from '../components/Icon'
import { RULES } from '../data/rules'
import type { Rule } from '../data/rules'
import { TOPICS, topicById } from '../data/topics'
import type { TopicId } from '../data/topics'
import { progressActions, useProgress } from '../hooks/useProgress'

type Filter = TopicId | 'all'

export function LibraryPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { rulesRead } = useProgress()
  const rules = filter === 'all' ? RULES : RULES.filter((rule) => rule.topic === filter)

  return (
    <AppShell current="library" eyebrow="Library" title="Grammar rules to look up">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter rules by topic" className="flex flex-wrap gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All rules
          </FilterButton>
          {TOPICS.map((topic) => (
            <FilterButton
              key={topic.id}
              active={filter === topic.id}
              onClick={() => setFilter(topic.id)}
            >
              {topic.title}
            </FilterButton>
          ))}
        </div>
        <p className="text-sm text-muted">
          <strong className="font-bold text-ink">
            {rulesRead.length} of {RULES.length}
          </strong>{' '}
          rules read
        </p>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {rules.map((rule) => (
          <li key={rule.id}>
            <RuleCard rule={rule} read={rulesRead.includes(rule.id)} />
          </li>
        ))}
      </ul>
    </AppShell>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-lg border px-3.5 text-sm font-bold transition-colors ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-line-strong bg-surface text-ink-soft hover:border-slot-line hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function RuleCard({ rule, read }: { rule: Rule; read: boolean }) {
  const topic = topicById(rule.topic)
  return (
    <article className="h-full rounded-2xl border border-line bg-surface shadow-card">
      <details
        className="group"
        onToggle={(event) => {
          if (event.currentTarget.open) progressActions.ruleRead(rule.id)
        }}
      >
        <summary className="flex cursor-pointer list-none items-start gap-3.5 rounded-2xl p-5 [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className={`grid size-11 shrink-0 place-items-center rounded-[11px] text-base font-semibold ${topic.cardClass} ${topic.markClass}`}
          >
            {topic.mark}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-extrabold tracking-[0.1em] text-muted uppercase">
              {topic.title}
            </span>
            <span className="font-display block pt-0.5 text-lg font-semibold text-ink">
              {rule.title}
            </span>
            <span className="block pt-1.5 text-[15px] leading-relaxed text-ink-soft">
              {rule.rule}
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-text">
              <span className="group-open:hidden">Show example</span>
              <span className="hidden group-open:inline">Hide example</span>
              <Icon
                name="chevronDown"
                size={16}
                className="transition-transform group-open:rotate-180 motion-reduce:transition-none"
              />
            </span>
          </span>
          {read && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-teal-tint px-2 py-1 text-xs font-bold text-teal-text">
              <Icon name="check" size={14} strokeWidth={2.6} />
              Read
            </span>
          )}
        </summary>

        <div className="grid gap-2 px-5 pb-5">
          <p className="flex items-start gap-2.5 rounded-[10px] bg-teal-tint p-3 text-[15px] leading-snug text-teal-text">
            <Icon name="check" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0" />
            <span>
              <span className="sr-only">Correct: </span>
              {rule.good}
            </span>
          </p>
          {rule.bad && (
            <p className="flex items-start gap-2.5 rounded-[10px] bg-coral-tint p-3 text-[15px] leading-snug text-coral-text">
              <Icon name="x" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0" />
              <span>
                <span className="sr-only">Not correct: </span>
                {rule.bad}
              </span>
            </p>
          )}
        </div>
      </details>
    </article>
  )
}
