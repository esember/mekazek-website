'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import TopicCard from './TopicCard'
import styles from './PowerPlatformApp.module.css'

export type Status = 'not_started' | 'in_progress' | 'completed'

export type TopicData = {
  id: string | null
  topic: string
  status: Status
  notes: string
  color: string
  saving: boolean
}

const TOPIC_CONFIG = [
  { name: 'Power Apps',     color: '#8b5cf6' },
  { name: 'Power Automate', color: '#3b82f6' },
  { name: 'Power BI',       color: '#f59e0b' },
  { name: 'Dataverse',      color: '#14b8a6' },
  { name: 'Copilot Studio', color: '#6366f1' },
  { name: 'ALM / DevOps',   color: '#f97316' },
  { name: 'Power Pages',    color: '#22c55e' },
]

const DEFAULT_TOPICS: TopicData[] = TOPIC_CONFIG.map(t => ({
  id: null, topic: t.name, status: 'not_started', notes: '', color: t.color, saving: false,
}))

export default function PowerPlatformApp() {
  const [topics, setTopics] = useState<TopicData[]>(DEFAULT_TOPICS)
  const [loading, setLoading] = useState(true)
  const topicsRef = useRef(topics)
  topicsRef.current = topics
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    supabase.from('study_progress').select('*').then(({ data }) => {
      const dbMap = new Map((data ?? []).map(r => [r.topic, r]))
      setTopics(TOPIC_CONFIG.map(cfg => ({
        id: dbMap.get(cfg.name)?.id ?? null,
        topic: cfg.name,
        status: (dbMap.get(cfg.name)?.status ?? 'not_started') as Status,
        notes: dbMap.get(cfg.name)?.notes ?? '',
        color: cfg.color,
        saving: false,
      })))
      setLoading(false)
    })
  }, [])

  const persist = useCallback(async (topicName: string, patch: { status?: Status; notes?: string }) => {
    const t = topicsRef.current.find(x => x.topic === topicName)!
    const full = { topic: topicName, status: t.status, notes: t.notes, ...patch }

    if (t.id) {
      await supabase.from('study_progress').update(patch).eq('id', t.id)
    } else {
      const { data } = await supabase
        .from('study_progress').insert(full).select('id').single()
      setTopics(prev => prev.map(x =>
        x.topic === topicName ? { ...x, id: data?.id ?? null } : x
      ))
    }
    setTopics(prev => prev.map(x => x.topic === topicName ? { ...x, saving: false } : x))
  }, [])

  const handleStatusChange = useCallback((topicName: string, status: Status) => {
    setTopics(prev => prev.map(t =>
      t.topic === topicName ? { ...t, status, saving: true } : t
    ))
    persist(topicName, { status })
  }, [persist])

  const handleNotesChange = useCallback((topicName: string, notes: string) => {
    setTopics(prev => prev.map(t => t.topic === topicName ? { ...t, notes } : t))
    clearTimeout(saveTimers.current[topicName])
    saveTimers.current[topicName] = setTimeout(() => {
      setTopics(prev => prev.map(t => t.topic === topicName ? { ...t, saving: true } : t))
      persist(topicName, { notes })
    }, 800)
  }, [persist])

  const completed  = topics.filter(t => t.status === 'completed').length
  const inProgress = topics.filter(t => t.status === 'in_progress').length
  const pct = Math.round((completed / topics.length) * 100)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Link href="/" className={styles.back}>← Back</Link>
          <h1 className={styles.title}>Power Platform</h1>
          <span className={styles.count}>{completed} / {topics.length}</span>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.pct}>{pct}% complete</span>
            <span className={styles.detail}>
              {inProgress > 0 && `${inProgress} in progress · `}
              {completed} of {topics.length} completed
            </span>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        ) : (
          <div className={styles.grid}>
            {topics.map(t => (
              <TopicCard
                key={t.topic}
                data={t}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
