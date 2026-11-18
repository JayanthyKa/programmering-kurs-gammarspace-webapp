export interface Exercise {
  id: string
  /** Sentence text before the blank. */
  before: string
  /** Sentence text after the blank. */
  after: string
  options: string[]
  answer: string
  /** Shown after a correct answer. */
  explanation: string
  /** Shown after an incorrect answer; nudges without giving the answer away. */
  hint: string
}

/** Exercises of the Subject–verb agreement lesson (the "Sentence" topic). */
export const exercises: Exercise[] = [
  {
    id: 'neither-reports',
    before: 'Neither of the reports',
    after: 'complete.',
    options: ['are', 'were', 'is'],
    answer: 'is',
    explanation: '“Neither” is singular, so it takes the singular verb “is.”',
    hint: 'The subject is “neither,” not “reports.” Is “neither” one thing or several?',
  },
  {
    id: 'committee-decision',
    before: 'The committee',
    after: 'reached its final decision.',
    options: ['have', 'has', 'are'],
    answer: 'has',
    explanation: '“The committee” acts as one unit here (“its decision”), so it takes “has.”',
    hint: 'Notice “its” later in the sentence. The committee is acting as a single unit.',
  },
  {
    id: 'everyone-notebook',
    before: 'Everyone in the workshops',
    after: 'a notebook.',
    options: ['need', 'needs', 'are needing'],
    answer: 'needs',
    explanation: '“Everyone” is always singular, so the verb is “needs.”',
    hint: 'Ignore “in the workshops.” The subject is “everyone,” which is always singular.',
  },
  {
    id: 'each-students',
    before: 'Each of the students',
    after: 'chosen a different topic.',
    options: ['have', 'has', 'are'],
    answer: 'has',
    explanation: '“Each” points to one student at a time, so it takes “has.”',
    hint: 'The subject is “each,” not “students.” “Each” means one at a time.',
  },
  {
    id: 'list-ingredients',
    before: 'The list of ingredients',
    after: 'printed on the back of the box.',
    options: ['are', 'is', 'were'],
    answer: 'is',
    explanation: 'The subject is “list,” which is singular, so the verb is “is.”',
    hint: 'What is printed on the box: the ingredients, or the list?',
  },
  {
    id: 'brother-friends',
    before: 'My brother, along with his friends,',
    after: 'arriving tonight.',
    options: ['are', 'is', 'were'],
    answer: 'is',
    explanation:
      '“Along with his friends” is extra detail. The subject is “my brother,” so use “is.”',
    hint: 'Phrases like “along with …” do not change the subject. Who is the sentence about?',
  },
]
