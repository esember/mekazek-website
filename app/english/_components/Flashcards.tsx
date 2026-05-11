'use client'

import { useState, useCallback } from 'react'
import type { Word } from './types'
import styles from './Flashcards.module.css'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface Props { words: Word[] }

export default function Flashcards({ words }: Props) {
  const [deck, setDeck] = useState(() => shuffle(words))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const reset = useCallback(() => {
    setDeck(shuffle(words))
    setIndex(0)
    setFlipped(false)
  }, [words])

  if (words.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Add some words in Vocabulary first!</p>
      </div>
    )
  }

  const current = deck[index]
  const total = deck.length

  const go = (dir: 1 | -1) => {
    const next = index + dir
    if (next < 0 || next >= total) return
    setIndex(next)
    setFlipped(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles.counter}>
        {index + 1} <span className={styles.sep}>/</span> {total}
      </div>

      <div
        className={`${styles.scene}`}
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
          <div className={styles.front}>
            <span className={styles.sideLabel}>word</span>
            <p className={styles.mainText}>{current.word}</p>
          </div>
          <div className={styles.back}>
            <span className={styles.sideLabel}>meaning</span>
            <p className={styles.mainText}>{current.meaning}</p>
            {current.example && (
              <p className={styles.example}>&ldquo;{current.example}&rdquo;</p>
            )}
          </div>
        </div>
      </div>

      <p className={styles.hint}>Click the card to flip</p>

      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={() => go(-1)}
          disabled={index === 0}
        >
          ← Prev
        </button>
        <button className={styles.shuffleBtn} onClick={reset}>
          Shuffle
        </button>
        <button
          className={styles.navBtn}
          onClick={() => go(1)}
          disabled={index === total - 1}
        >
          Next →
        </button>
      </div>

      <div className={styles.dots}>
        {deck.map((_, i) => (
          <span
            key={i}
            className={`${styles.dotPip} ${i === index ? styles.dotActive : ''}`}
            onClick={() => { setIndex(i); setFlipped(false) }}
          />
        ))}
      </div>
    </div>
  )
}
