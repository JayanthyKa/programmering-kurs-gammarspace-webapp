import { exercises as sentenceExercises } from './exercises'
import type { Exercise } from './exercises'
import type { TopicId } from './topics'

interface PathItem {
  title: string
  detail: string
}

/**
 * The details of each unit together with its first lesson. The later lessons of a unit
 * are in moreLessons.ts, and units.ts puts the two together.
 */
export interface Lesson {
  topic: TopicId
  /** Small label above the page heading, e.g. "Foundations · Unit 1". */
  eyebrow: string
  heading: string
  /** Name of the lesson, shown on the exercise card. */
  title: string
  tip: string
  /** "Your path" panel: the unit name, and the intro shown as already done (if any). */
  unit: string
  done?: PathItem
  /** Six exercises, one per disc on the journey path. */
  exercises: Exercise[]
}

export const LESSONS: Record<TopicId, Lesson> = {
  sentence: {
    topic: 'sentence',
    eyebrow: 'Foundations · Unit 4',
    heading: 'Building better sentences',
    title: 'Subject–verb agreement',
    tip: 'Singular subjects need singular verbs—even when extra words sit between them.',
    unit: 'Unit 4',
    done: { title: 'Sentence basics', detail: 'Completed · +40 XP' },
    exercises: sentenceExercises,
  },

  parts: {
    topic: 'parts',
    eyebrow: 'Word classes · Unit 1',
    heading: 'Getting to know words',
    title: 'Nouns, verbs and adjectives',
    tip: 'Ask what job the word does: naming, doing or describing.',
    unit: 'Unit 1',
    exercises: [
      {
        id: 'parts-red',
        before: 'The',
        after: 'balloon floated away.',
        options: ['redly', 'red', 'redden'],
        answer: 'red',
        explanation: '“Red” is an adjective. It describes the noun “balloon.”',
        hint: 'You need a describing word. What is the balloon like?',
      },
      {
        id: 'parts-cooks',
        before: 'My grandmother',
        after: 'delicious soup.',
        options: ['cooker', 'cooking', 'cooks'],
        answer: 'cooks',
        explanation: '“Cooks” is the verb. It tells you what my grandmother does.',
        hint: 'The sentence needs a doing word. What does she do?',
      },
      {
        id: 'parts-elephant',
        before: 'We saw a huge',
        after: 'at the zoo.',
        options: ['elephant', 'enormous', 'eat'],
        answer: 'elephant',
        explanation: '“Elephant” is a noun. It names the thing we saw.',
        hint: 'You need a naming word. What could you see at a zoo?',
      },
      {
        id: 'parts-playful',
        before: 'The kitten is very',
        after: 'today.',
        options: ['play', 'player', 'playful'],
        answer: 'playful',
        explanation: '“Playful” is an adjective. It describes the kitten.',
        hint: 'After “very” you need a describing word.',
      },
      {
        id: 'parts-laughed',
        before: 'The children',
        after: 'loudly at the joke.',
        options: ['laughter', 'laughed', 'laughable'],
        answer: 'laughed',
        explanation: '“Laughed” is the verb. It tells you what the children did.',
        hint: 'What did the children do? Pick the doing word.',
      },
      {
        id: 'parts-books',
        before: 'Please put your',
        after: 'on the shelf.',
        options: ['bookish', 'booked', 'books'],
        answer: 'books',
        explanation: '“Books” is a noun. It names the things you put on the shelf.',
        hint: 'You need a naming word for things that go on a shelf.',
      },
    ],
  },

  tense: {
    topic: 'tense',
    eyebrow: 'Time travel · Unit 2',
    heading: 'When did it happen?',
    title: 'Past, present and future',
    tip: 'Look for time words like yesterday, now and tomorrow. They tell you which tense to use.',
    unit: 'Unit 2',
    done: { title: 'What is a verb?', detail: 'Completed · +40 XP' },
    exercises: [
      {
        id: 'tense-finished',
        before: 'Last night I',
        after: 'my homework.',
        options: ['finish', 'finished', 'will finish'],
        answer: 'finished',
        explanation: '“Last night” is in the past, so the verb is “finished.”',
        hint: 'Look at “last night.” Has it already happened?',
      },
      {
        id: 'tense-will-travel',
        before: 'Next summer we',
        after: 'to the seaside.',
        options: ['travelled', 'travel', 'will travel'],
        answer: 'will travel',
        explanation: '“Next summer” has not happened yet, so use “will travel.”',
        hint: 'Look at “next summer.” Is that the past or the future?',
      },
      {
        id: 'tense-drinks',
        before: 'Every morning Dad',
        after: 'a cup of tea.',
        options: ['drinks', 'drank', 'will drink'],
        answer: 'drinks',
        explanation:
          '“Every morning” means it happens again and again, so use the present: “drinks.”',
        hint: '“Every morning” tells you it happens regularly, including now.',
      },
      {
        id: 'tense-rained',
        before: 'Two days ago it',
        after: 'all afternoon.',
        options: ['rains', 'will rain', 'rained'],
        answer: 'rained',
        explanation: '“Two days ago” is in the past, so the verb is “rained.”',
        hint: 'Look at “two days ago.” When was that?',
      },
      {
        id: 'tense-is-wagging',
        before: 'Look! The dog',
        after: 'its tail.',
        options: ['wagged', 'is wagging', 'will wag'],
        answer: 'is wagging',
        explanation: '“Look!” means it is happening right now: “is wagging.”',
        hint: '“Look!” tells you it is happening at this moment.',
      },
      {
        id: 'tense-will-be',
        before: 'When I grow up, I',
        after: 'a vet.',
        options: ['was', 'will be', 'am'],
        answer: 'will be',
        explanation: 'Growing up is still to come, so use the future: “will be.”',
        hint: 'Have you grown up yet? Choose the tense for things still to come.',
      },
    ],
  },

  punctuation: {
    topic: 'punctuation',
    eyebrow: 'Clear writing · Unit 3',
    heading: 'Marks that make meaning',
    title: 'Ending and pausing',
    tip: 'Read the sentence aloud. Does your voice ask, tell, shout or pause?',
    unit: 'Unit 3',
    done: { title: 'Capital letters', detail: 'Completed · +40 XP' },
    exercises: [
      {
        id: 'punct-film',
        before: 'What time does the film start',
        after: '',
        options: ['.', '?', '!'],
        answer: '?',
        explanation: 'The sentence asks something, so it ends with a question mark.',
        hint: 'Is the sentence telling you something or asking you something?',
      },
      {
        id: 'punct-list',
        before: 'We need pencils',
        after: 'paper and glue.',
        options: [',', '.', '?'],
        answer: ',',
        explanation: 'A comma separates the things in a list.',
        hint: 'Pencils, paper and glue are a list. What goes between list items?',
      },
      {
        id: 'punct-library',
        before: 'The library closes at five o’clock',
        after: '',
        options: ['?', ',', '.'],
        answer: '.',
        explanation: 'This sentence states a fact, so it ends with a full stop.',
        hint: 'The sentence tells you a fact. How does a statement end?',
      },
      {
        id: 'punct-hooray',
        before: 'Hooray, we won the match',
        after: '',
        options: [',', '!', '?'],
        answer: '!',
        explanation: 'An excited shout ends with an exclamation mark.',
        hint: 'Someone is cheering. Which mark shows strong feeling?',
      },
      {
        id: 'punct-after-lunch',
        before: 'After lunch',
        after: 'we played outside.',
        options: ['.', '!', ','],
        answer: ',',
        explanation: 'A comma marks the short pause after an opening phrase.',
        hint: 'Read it aloud. Your voice pauses after “After lunch,” but the sentence carries on.',
      },
      {
        id: 'punct-strawberries',
        before: 'Do you like strawberries',
        after: '',
        options: ['!', '.', '?'],
        answer: '?',
        explanation: 'The sentence asks something, so it ends with a question mark.',
        hint: 'Would you expect an answer to this sentence?',
      },
    ],
  },
}
