import type { TopicId } from './topics'

export interface Rule {
  id: string
  topic: TopicId
  title: string
  /** The rule in one or two short sentences. */
  rule: string
  /** A sentence that follows the rule. */
  good: string
  /** The same idea written wrongly, when a contrast helps. */
  bad?: string
}

export const RULES: Rule[] = [
  {
    id: 'nouns',
    topic: 'parts',
    title: 'Nouns name things',
    rule: 'A noun is a word for a person, a place, a thing or an idea.',
    good: 'The dog chased the ball across the park.',
  },
  {
    id: 'verbs',
    topic: 'parts',
    title: 'Verbs show action',
    rule: 'A verb tells you what someone or something does, or is.',
    good: 'Maya runs to school every morning.',
  },
  {
    id: 'adjectives',
    topic: 'parts',
    title: 'Adjectives describe',
    rule: 'An adjective tells you more about a noun: what it looks, feels or sounds like.',
    good: 'The tiny kitten slept on a soft blanket.',
  },
  {
    id: 'past',
    topic: 'tense',
    title: 'Past tense',
    rule: 'Use the past tense for things that have already happened. Many past verbs end in -ed.',
    good: 'Yesterday we walked to the library.',
    bad: 'Yesterday we walk to the library.',
  },
  {
    id: 'future',
    topic: 'tense',
    title: 'Future tense',
    rule: 'Use “will” and a verb for things that have not happened yet.',
    good: 'Tomorrow I will bake a cake.',
    bad: 'Tomorrow I baked a cake.',
  },
  {
    id: 'capitals',
    topic: 'punctuation',
    title: 'Capital letters and full stops',
    rule: 'Start every sentence with a capital letter and end a statement with a full stop.',
    good: 'My cat is asleep.',
    bad: 'my cat is asleep',
  },
  {
    id: 'questions',
    topic: 'punctuation',
    title: 'Question marks',
    rule: 'If the sentence asks something, end it with a question mark.',
    good: 'Where is my hat?',
    bad: 'Where is my hat.',
  },
  {
    id: 'commas',
    topic: 'punctuation',
    title: 'Commas in a list',
    rule: 'Put commas between the things in a list so they do not run together.',
    good: 'I packed apples, grapes and plums.',
    bad: 'I packed apples grapes and plums.',
  },
  {
    id: 'agreement',
    topic: 'sentence',
    title: 'Subject and verb must match',
    rule: 'One person or thing takes a singular verb. More than one takes a plural verb.',
    good: 'Everyone needs a notebook.',
    bad: 'Everyone need a notebook.',
  },
  {
    id: 'complete',
    topic: 'sentence',
    title: 'A full sentence',
    rule: 'A sentence needs a subject (who or what) and a verb (what they do).',
    good: 'The small bird sang.',
    bad: 'The small bird.',
  },
]
