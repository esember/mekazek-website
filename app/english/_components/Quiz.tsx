'use client'

import { useState, useCallback } from 'react'
import type { Word } from './types'
import styles from './Quiz.module.css'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type Question = {
  word: Word
  options: Word[]
  correctId: string
}

function buildQuestions(words: Word[]): Question[] {
  return shuffle(words).map(w => {
    const others = shuffle(words.filter(x => x.id !== w.id)).slice(0, 3)
    return {
      word: w,
      options: shuffle([w, ...others]),
      correctId: w.id,
    }
  })
}

interface Props { words: Word[] }

export default function Quiz({ words }: Props) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(words))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const restart = useCallback(() => {
    setQuestions(buildQuestions(words))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }, [words])

  if (words.length < 4) {
    return (
      <div className={styles.empty}>
        <p>Add at least <strong>4 words</strong> to start the quiz!</p>
        <p>You currently have {words.length} word{words.length !== 1 ? 's' : ''}.</p>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className={styles.result}>
        <p className={styles.resultLabel}>Quiz Complete</p>
        <p className={styles.resultScore}>{score}<span className={styles.resultTotal}> / {questions.length}</span></p>
        <p className={styles.resultPct}>{pct}%</p>
        <p className={styles.resultMsg}>
          {pct === 100 ? 'Perfect score!' :
           pct >= 70   ? 'Great job!' :
                         'Keep practicing!'}
        </p>
        <button className={styles.restartBtn} onClick={restart}>Try Again</button>
      </div>
    )
  }

  const q = questions[index]
  const answered = selected !== null
  const progress = ((index) / questions.length) * 100

  const choose = (id: string) => {
    if (answered) return
    setSelected(id)
    if (id === q.correctId) setScore(s => s + 1)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setSelected(null)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.meta}>
          <span>{index + 1} / {questions.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className={styles.question}>
        <p className={styles.prompt}>What is the meaning of:</p>
        <h2 className={styles.word}>{q.word.word}</h2>
      </div>

      <div className={styles.options}>
        {q.options.map(opt => {
          let cls = styles.option
          if (answered) {
            if (opt.id === q.correctId) cls = `${styles.option} ${styles.correct}`
            else if (opt.id === selected)  cls = `${styles.option} ${styles.wrong}`
          }
          return (
            <button key={opt.id} className={cls} onClick={() => choose(opt.id)}>
              {opt.meaning}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={styles.nextRow}>
          <p className={styles.feedbackText}>
            {selected === q.correctId ? 'Correct!' : `Correct answer: ${q.word.meaning}`}
          </p>
          <button className={styles.nextBtn} onClick={next}>
            {index + 1 >= questions.length ? 'See Results →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}
