export const metadata = {
  title: 'Leave Request App — Apps Showcase',
}

export default function LeaveRequestShowcase() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', gap: '1rem',
      background: '#0a0718', color: '#8077a8',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ fontSize: '3rem' }}>📅</div>
      <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ede8f5' }}>Leave Request App</div>
      <div style={{ fontSize: '0.95rem' }}>In development — coming soon</div>
      <a href="/portfolio/showcase" style={{
        marginTop: '1rem', color: '#9b2d8a', textDecoration: 'none',
        fontSize: '0.85rem', fontWeight: 600,
      }}>← Back to Showcase</a>
    </div>
  )
}
