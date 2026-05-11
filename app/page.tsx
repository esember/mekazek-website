'use client'

import { useState } from 'react'
import PasswordModal from '@/components/PasswordModal'
import styles from './page.module.css'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Welcome</h1>
      <button className={styles.portfolioBtn} onClick={() => setModalOpen(true)}>
        Portfolio &rarr;
      </button>
      {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}
