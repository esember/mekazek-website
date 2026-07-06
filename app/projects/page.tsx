export const metadata = {
  title: 'All Projects — mekazek',
  description: 'Enterprise production systems, architecture designs, and personal AI projects.',
}

export default function ProjectsPage() {
  return (
    <iframe
      src="/projects/index.html"
      style={{ display: 'block', width: '100%', height: '100vh', border: 'none' }}
      title="All Projects"
    />
  )
}
