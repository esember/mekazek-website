import Link from 'next/link'
import styles from './english.module.css'

export const metadata = {
  title: 'English App — Mekazek',
}

export default function English() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>English App</h2>
      <div className={styles.divider} />
      <p className={styles.subtitle}>Coming soon</p>
      <Link href="/" className={styles.back}>&larr; Back</Link>
    </main>
  )
}
