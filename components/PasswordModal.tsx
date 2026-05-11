'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from './PasswordModal.module.css'

const PASSWORD = 'mekazek2024'

interface Props {
  onClose: () => void
}

export default function PasswordModal({ onClose }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const attempt = useCallback(() => {
    if (inputRef.current?.value === PASSWORD) {
      router.push('/portfolio')
    } else {
      setError(true)
      setShake(true)
      if (inputRef.current) inputRef.current.value = ''
      inputRef.current?.focus()
      setTimeout(() => setShake(false), 400)
    }
  }, [router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') attempt()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <span className={styles.label}>Enter password</span>
        {error && <p className={styles.error}>Incorrect password</p>}
        <input
          ref={inputRef}
          type="password"
          className={`${styles.input} ${shake ? styles.shake : ''}`}
          placeholder="••••••••"
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
        />
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.submit} onClick={attempt}>Enter</button>
        </div>
      </div>
    </div>
  )
}
