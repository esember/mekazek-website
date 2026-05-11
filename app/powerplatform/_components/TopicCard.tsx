'use client'

import type { TopicData, Status } from './PowerPlatformApp'
import styles from './TopicCard.module.css'

const STATUS_CONFIG: { value: Status; label: string }[] = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed',   label: 'Completed'   },
]

interface Props {
  data: TopicData
  onStatusChange: (topic: string, status: Status) => void
  onNotesChange:  (topic: string, notes: string) => void
}

export default function TopicCard({ data, onStatusChange, onNotesChange }: Props) {
  const { topic, status, notes, color, saving } = data

  return (
    <div
      className={`${styles.card} ${styles[status]}`}
      style={{ '--topic-color': color } as React.CSSProperties}
    >
      <div className={styles.cardHeader}>
        <span className={styles.colorDot} style={{ background: color }} />
        <h3 className={styles.topicName}>{topic}</h3>
        <span className={`${styles.savingBadge} ${saving ? styles.savingVisible : ''}`}>
          saving…
        </span>
      </div>

      <div className={styles.statusRow}>
        {STATUS_CONFIG.map(s => (
          <button
            key={s.value}
            onClick={() => onStatusChange(topic, s.value)}
            className={`${styles.statusBtn} ${styles[`btn_${s.value}`]} ${status === s.value ? styles.statusActive : ''}`}
          >
            {status === s.value && <span className={styles.checkmark}>✓ </span>}
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.notesWrap}>
        <label className={styles.notesLabel}>Notes</label>
        <textarea
          className={styles.notes}
          value={notes}
          onChange={e => onNotesChange(topic, e.target.value)}
          placeholder="Add study notes, links, key concepts…"
          rows={4}
        />
      </div>
    </div>
  )
}
