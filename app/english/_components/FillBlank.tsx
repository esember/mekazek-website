'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Word } from './types'
import styles from './FillBlank.module.css'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

type Question = {
  word: Word
  sentence: string
  answer: string
}

function buildQuestions(words: Word[]): Question[] {
  return shuffle(words.filter(w => w.example?.trim())).map(w => {
    const regex = new RegExp(`\\b${w.word}\\b`, 'i')
    const match = w.example.match(regex)
    const matched = match ? match[0] : w.word
    const sentence = w.example.replace(regex, '_____')
    return { word: w, sentence, answer: matched.toLowerCase() }
  })
}

interface Props { words: Word[] }

export default function FillBlank({ words }: Props) {
  const wordsWithExample = words.filter(w => w.example?.trim())
  const [questions] = useState<Question[]>(() => buildQuestions(words))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!checked) inputRef.current?.focus()
  }, [index, checked])

  const restart = useCallback(() => {
    setIndex(0)
    setInput('')
    setChecked(false)
    setIsCorrect(false)
    setScore(0)
    setDone(false)
  }, [])

  if (wordsWithExample.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Add <strong>example sentences</strong> to your words to use this exercise.</p>
        <p>Go to Vocabulary and include an example when adding words.</p>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className={styles.result}>
        <p className={styles.resultLabel}>Exercise Complete</p>
        <p className={styles.resultScore}>{score}<span className={styles.resultTotal}> / {questions.length}</span></p>
        <p className={styles.resultPct}>{pct}%</p>
        <p className={styles.resultMsg}>
          {pct === 100 ? 'Perfect!' : pct >= 70 ? 'Great job!' : 'Keep practicing!'}
        </p>
        <button className={styles.restartBtn} onClick={restart}>Try Again</button>
      </div>
    )
  }

  const q = questions[index]
  const progress = (index / questions.length) * 100

  const check = () => {
    if (!input.trim() || checked) return
    const correct = input.trim().toLowerCase() === q.answer
    setIsCorrect(correct)
    if (correct) setScore(s => s + 1)
    setChecked(true)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setInput('')
      setChecked(false)
      setIsCorrect(false)
    }
  }

  const parts = q.sentence.split('_____')

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

      <div className={styles.exercise}>
        <p className={styles.prompt}>Fill in the blank:</p>
        <p className={styles.sentence}>
          {parts[0]}
          <span className={`${styles.blank} ${checked ? (isCorrect ? styles.blankCorrect : styles.blankWrong) : ''}`}>
            {checked ? q.word.word : '_____'}
          </span>
          {parts[1]}
        </p>
        <p className={styles.meaningHint}>
          Meaning: <em>{q.word.meaning}</em>
        </p>
      </div>

      {!checked && (
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && check()}
            placeholder="Type the missing word..."
            autoComplete="off"
            autoCapitalize="off"
          />
          <button className={styles.checkBtn} onClick={check} disabled={!input.trim()}>
            Check
          </button>
        </div>
      )}

      {checked && (
        <div className={styles.feedback}>
          {isCorrect ? (
            <p className={styles.feedbackCorrect}>Correct!</p>
          ) : (
            <p className={styles.feedbackWrong}>
              Answer: <strong>{q.word.word}</strong>
              {input && <span className={styles.yourAnswer}> (you wrote: {input})</span>}
            </p>
          )}
          <button className={styles.nextBtn} onClick={next}>
            {index + 1 >= questions.length ? 'See Results →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}
