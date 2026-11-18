import { useEffect } from 'react'
import { UNITS, lessonHref } from './data/units'
import { useHashRoute, useLessonRef } from './hooks/useHashRoute'
import type { Route } from './hooks/useHashRoute'
import { useProgress } from './hooks/useProgress'
import { currentLessonInUnit, isLessonUnlocked } from './lesson/lessonOrder'
import { AchievementsPage } from './pages/AchievementsPage'
import { HomePage } from './pages/HomePage'
import { LessonLockedPage } from './pages/LessonLockedPage'
import { LessonPage } from './pages/LessonPage'
import { LibraryPage } from './pages/LibraryPage'
import { PracticePage } from './pages/PracticePage'
import { ProfilePage } from './pages/ProfilePage'
import { SignInPage } from './pages/SignInPage'
import { TopicsPage } from './pages/TopicsPage'

const TITLES: Record<Route, string> = {
  home: 'GrammarSpace — Write with clarity',
  topics: 'Choose a topic — GrammarSpace',
  lesson: 'Lesson — GrammarSpace',
  library: 'Library — GrammarSpace',
  practice: 'Practice — GrammarSpace',
  achievements: 'Achievements — GrammarSpace',
  profile: 'Your profile — GrammarSpace',
  signin: 'Welcome — GrammarSpace',
}

function App() {
  const route = useHashRoute()
  const lessonRef = useLessonRef()
  const { completedLessons } = useProgress()

  const unit = UNITS[lessonRef.topic]
  // An address without a valid lesson number names only the unit.
  const lesson = route === 'lesson' ? (unit.lessons[lessonRef.number - 1] ?? null) : null
  const needsLessonNumber = route === 'lesson' && lesson === null

  useEffect(() => {
    // Send a unit address on to the lesson to do next in that unit. The address then names
    // one lesson, so finishing it does not swap the page to the next lesson by itself.
    if (needsLessonNumber) {
      window.location.replace(lessonHref(currentLessonInUnit(lessonRef.topic, completedLessons)))
    }
  }, [needsLessonNumber, lessonRef.topic, completedLessons])

  useEffect(() => {
    document.title = lesson ? `${lesson.title} — GrammarSpace` : TITLES[route]
    window.scrollTo(0, 0)
  }, [route, lesson])

  if (route === 'lesson') {
    if (!lesson) return null
    if (!isLessonUnlocked(lesson, completedLessons)) {
      return <LessonLockedPage unit={unit} lesson={lesson} />
    }
    // Keyed by lesson so each one gets its own journey state.
    return <LessonPage key={lesson.id} unit={unit} lesson={lesson} />
  }
  if (route === 'library') return <LibraryPage />
  if (route === 'practice') return <PracticePage />
  if (route === 'achievements') return <AchievementsPage />
  if (route === 'profile') return <ProfilePage />
  if (route === 'signin') return <SignInPage />
  if (route === 'topics') return <TopicsPage />
  return <HomePage />
}

export default App
