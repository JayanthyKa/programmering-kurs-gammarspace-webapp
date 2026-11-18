import { Icon } from '../Icon'

interface FeedbackCardProps {
  tone: 'correct' | 'wrong'
  title: string
  message: string
}

/** Teal for correct, coral for incorrect, as in the Figma "answers-card" component. */
export function FeedbackCard({ tone, title, message }: FeedbackCardProps) {
  const correct = tone === 'correct'
  return (
    <div
      className={`feedback-in flex items-start gap-3 rounded-[10px] border p-3.5 ${
        correct ? 'border-teal/25 bg-teal-tint' : 'border-coral/35 bg-coral-tint'
      }`}
    >
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-lg ${
          correct ? 'bg-teal text-white' : 'bg-coral text-[#4a1a12]'
        }`}
      >
        <Icon name={correct ? 'check' : 'x'} size={20} strokeWidth={2.5} />
      </span>
      <div className={`text-sm leading-snug ${correct ? 'text-teal-text' : 'text-coral-text'}`}>
        <p className="font-bold">{title}</p>
        <p className="pt-0.5">{message}</p>
      </div>
    </div>
  )
}
