import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ContactButton from '../components/ContactButton'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mekazek',
  description: 'Personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
        <ContactButton />
      </body>
    </html>
  )
}
