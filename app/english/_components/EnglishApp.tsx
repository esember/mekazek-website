'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Word } from './types'
import Vocabulary from './Vocabulary'
import Flashcards from './Flashcards'
import Quiz from './Quiz'
import FillBlank from './FillBlank'
import styles from './EnglishApp.module.css'

type Tab = 'vocabulary' | 'flashcards' | 'quiz' | 'fillblank'

const TABS: { id: Tab; label: string }[] = [
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'fillblank', label: 'Fill in Blank' },
]

export default function EnglishApp() {
  const [tab, setTab] = useState<Tab>('vocabulary')
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWords = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('vocabulary')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) {
      setError('Could not load vocabulary. Check your Supabase table setup.')
    } else {
      setWords(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchWords() }, [fetchWords])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.back}>← Back</Link>
          <h1 className={styles.title}>English</h1>
          <span className={styles.wordCount}>{words.length} words</span>
        </div>
        <nav className={styles.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        ) : error ? (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {tab === 'vocabulary' && <Vocabulary words={words} onRefresh={fetchWords} />}
            {tab === 'flashcards' && <Flashcards words={words} />}
            {tab === 'quiz' && <Quiz words={words} />}
            {tab === 'fillblank' && <FillBlank words={words} />}
          </>
        )}
      </main>
    </div>
  )
}
