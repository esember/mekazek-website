'use client'

import { useState } from 'react'
import Link from 'next/link'
import PasswordModal from '@/components/PasswordModal'
import styles from './page.module.css'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Welcome to the Portfolio Page</h1>

      <nav className={styles.nav}>
        <Link href="/english" className={styles.navLink}>
          
        </Link>
        <Link href="/powerplatform" className={styles.navLink}>
          
        </Link>
        <button className={styles.navLink} onClick={() => setModalOpen(true)}>
          Portfolio
        </button>
      </nav>

      {modalOpen && <PasswordModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}
