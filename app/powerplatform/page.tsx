import Link from 'next/link'
import styles from './powerplatform.module.css'

export const metadata = {
  title: 'Power Platform — Mekazek',
}

export default function PowerPlatform() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Power Platform</h2>
      <div className={styles.divider} />
      <p className={styles.subtitle}>Coming soon</p>
      <Link href="/" className={styles.back}>&larr; Back</Link>
    </main>
  )
}
