export type AnswerStatus = 'idle' | 'correct' | 'wrong'

export interface LessonState {
  /** Indexes of the exercises still to be answered; the head is on screen. */
  queue: number[]
  placed: string | null
  status: AnswerStatus
}

export type LessonAction =
  | { type: 'place'; word: string }
  | { type: 'remove' }
  | { type: 'check'; correct: boolean }
  | { type: 'retry' }
  | { type: 'next' }
  | { type: 'skip' }
  | { type: 'restart'; queue: number[] }

/** Exercise indexes 0..count-1 in order. */
export function orderedQueue(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index)
}

/** Exercise indexes 0..count-1 in random order. */
export function shuffledQueue(count: number): number[] {
  const queue = orderedQueue(count)
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[queue[i], queue[j]] = [queue[j], queue[i]]
  }
  return queue
}

export function createLessonState(queue: number[]): LessonState {
  return { queue, placed: null, status: 'idle' }
}

export function lessonReducer(state: LessonState, action: LessonAction): LessonState {
  switch (action.type) {
    case 'place':
      return state.status === 'idle' ? { ...state, placed: action.word } : state
    case 'remove':
      return state.status === 'idle' ? { ...state, placed: null } : state
    case 'check':
      if (state.status !== 'idle' || state.placed === null || state.queue.length === 0) return state
      return { ...state, status: action.correct ? 'correct' : 'wrong' }
    case 'retry':
      return state.status === 'wrong' ? { ...state, placed: null, status: 'idle' } : state
    case 'next':
      return state.status === 'correct'
        ? { queue: state.queue.slice(1), placed: null, status: 'idle' }
        : state
    case 'skip': {
      if (state.status === 'correct' || state.queue.length < 2) return state
      const [head, ...rest] = state.queue
      return { queue: [...rest, head], placed: null, status: 'idle' }
    }
    case 'restart':
      return createLessonState(action.queue)
  }
}

/** Steps answered correctly so far. Only a correct answer ever increases this. */
export function completedSteps(state: LessonState, total: number): number {
  return total - state.queue.length + (state.status === 'correct' ? 1 : 0)
}
