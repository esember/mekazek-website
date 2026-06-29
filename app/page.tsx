import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
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
        <Link href="/helpdesk" className={styles.navLink}>
          IT Help Desk
        </Link>
        <Link href="/portfolio" className={styles.navLink}>
          Portfolio
        </Link>
      </nav>
    </main>
  )
}
