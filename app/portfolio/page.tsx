import Link from 'next/link'
import styles from './portfolio.module.css'

export const metadata = {
  title: 'Portfolio — Mekazek',
}

export default function Portfolio() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Portfolio</h2>
      <div className={styles.divider} />
      <p className={styles.subtitle}>Coming soon</p>
      <Link href="/" className={styles.back}>&larr; Back</Link>
    </main>
  )
}
