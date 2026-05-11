'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Word } from './types'
import styles from './Vocabulary.module.css'

interface Props {
  words: Word[]
  onRefresh: () => void
}

export default function Vocabulary({ words, onRefresh }: Props) {
  const [form, setForm] = useState({ word: '', meaning: '', example: '' })
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.word.trim() || !form.meaning.trim()) {
      setError('Word and meaning are required.')
      return
    }
    setAdding(true)
    setError('')
    const { error: err } = await supabase.from('vocabulary').insert([{
      word: form.word.trim(),
      meaning: form.meaning.trim(),
      example: form.example.trim(),
    }])
    if (err) {
      setError('Failed to add word. ' + err.message)
    } else {
      setForm({ word: '', meaning: '', example: '' })
      onRefresh()
    }
    setAdding(false)
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await supabase.from('vocabulary').delete().eq('id', id)
    onRefresh()
    setDeletingId(null)
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleAdd}>
        <h3 className={styles.formTitle}>Add Word</h3>
        <div className={styles.fields}>
          <input
            className={styles.input}
            placeholder="Word"
            value={form.word}
            onChange={set('word')}
            autoComplete="off"
          />
          <input
            className={styles.input}
            placeholder="Meaning / Translation"
            value={form.meaning}
            onChange={set('meaning')}
            autoComplete="off"
          />
          <input
            className={`${styles.input} ${styles.inputWide}`}
            placeholder="Example sentence (optional)"
            value={form.example}
            onChange={set('example')}
            autoComplete="off"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.addBtn} type="submit" disabled={adding}>
          {adding ? 'Adding...' : '+ Add Word'}
        </button>
      </form>

      {words.length === 0 ? (
        <div className={styles.empty}>
          <p>No words yet.</p>
          <p>Add your first word above to get started!</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Word</th>
                <th>Meaning</th>
                <th>Example</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {words.map(w => (
                <tr key={w.id}>
                  <td className={styles.wordCell}>{w.word}</td>
                  <td className={styles.meaningCell}>{w.meaning}</td>
                  <td className={styles.exampleCell}>{w.example || <span className={styles.none}>—</span>}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(w.id)}
                      disabled={deletingId === w.id}
                      aria-label={`Delete ${w.word}`}
                    >
                      {deletingId === w.id ? '...' : '✕'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
