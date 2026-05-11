'use client'

import { useState } from 'react'
import Link from 'next/link'
import PasswordModal from '@/components/PasswordModal'
import styles from './page.module.css'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Welcome</h1>

      <nav className={styles.nav}>
        <Link href="/english" className={styles.navLink}>
          English App
        </Link>
        <Link href="/powerplatform" className={styles.navLink}>
          Power Platform
        </Link>
        <Link href="/pp-rehber" className={styles.navLink}>
          PP Mülakat Rehberi
        </Link>
        <button className={styles.navLink} onClick={() => setModalOpen(true)}>
          Portfolio
        </button>
      </nav>

      {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}
