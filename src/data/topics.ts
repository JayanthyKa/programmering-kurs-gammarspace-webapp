export type TopicId = 'parts' | 'tense' | 'punctuation' | 'sentence'

export interface Topic {
  id: TopicId
  mark: string
  title: string
  description: string
  /** Tailwind classes for the tinted card and its accent text. */
  cardClass: string
  markClass: string
}

/** The four topics from the Figma "Cards" component. */
export const TOPICS: Topic[] = [
  {
    id: 'parts',
    mark: 'Aa',
    title: 'Parts of speech',
    description: 'Explore nouns, verbs and adjectives',
    cardClass: 'bg-topic-blue',
    markClass: 'text-[#3657c9]',
  },
  {
    id: 'tense',
    mark: 'T',
    title: 'Tense',
    description: 'Learn past, present and future',
    cardClass: 'bg-topic-teal',
    markClass: 'text-teal-text',
  },
  {
    id: 'punctuation',
    mark: ',?!',
    title: 'Punctuation',
    description: 'Make sentences clear and correct',
    cardClass: 'bg-topic-sun',
    markClass: 'text-sun-text',
  },
  {
    id: 'sentence',
    mark: 'S',
    title: 'Sentence',
    description: 'Create your own sentences',
    cardClass: 'bg-topic-lav',
    markClass: 'text-lav-text',
  },
]

export function topicById(id: TopicId): Topic {
  return TOPICS.find((topic) => topic.id === id) ?? TOPICS[0]
}
