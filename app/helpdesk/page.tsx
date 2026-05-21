export const metadata = {
  title: 'IT Help Desk — Mekazek',
}

export default function HelpDesk() {
  return (
    <iframe
      src="/helpdesk/index.html"
      style={{ display: 'block', width: '100%', height: '100vh', border: 'none' }}
      title="IT Help Desk Ticket System"
    />
  )
}
