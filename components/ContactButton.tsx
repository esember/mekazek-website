'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './ContactButton.module.css'

const ACCESS_KEY = '62d90411-774b-473a-8a1b-49f5ca223a82'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactButton() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setStatus('idle')
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('mekazek-no-scroll')
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('mekazek-no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        formRef.current?.reset()
        setTimeout(close, 1800)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-label="Contact & consulting"
      >
        <span className={styles.fabIcon}>
          <span className={styles.fabPulse} />
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M4 6.5 12 13l8-6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className={styles.fabLabel}>Let&rsquo;s talk</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && close()}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            <div className={styles.headIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M4 6.5 12 13l8-6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.title}>Contact &amp; Consulting</h2>
            <p className={styles.lead}>Interested in discussing a project? Fill out the form and I&rsquo;ll get back to you shortly.</p>

            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>Message sent, thank you!</p>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value={ACCESS_KEY} />
                <input type="hidden" name="subject" value="mekazek.com — New Contact Form Submission" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className={styles.field}>
                  <label htmlFor="cb-name">Full Name</label>
                  <input id="cb-name" name="name" type="text" placeholder="Your full name" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cb-email">Email</label>
                  <input id="cb-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cb-phone">Phone (optional)</label>
                  <input id="cb-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cb-message">Message</label>
                  <textarea id="cb-message" name="message" placeholder="Briefly describe your project..." required />
                </div>

                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? <span className={styles.spinner} /> : 'Send'}
                </button>
                {status === 'error' && (
                  <p className={styles.errorMsg}>Something went wrong, please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
