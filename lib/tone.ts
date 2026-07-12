export type Tone = 'ok' | 'warn' | 'crit'

export const toneClasses: Record<Tone, string> = {
  ok: 'bg-[oklch(0.95_0.05_145)] text-[oklch(0.4_0.12_145)] border-[oklch(0.85_0.08_145)]',
  warn: 'bg-[oklch(0.96_0.06_75)] text-[oklch(0.45_0.13_60)] border-[oklch(0.85_0.1_75)]',
  crit: 'bg-accent text-accent-foreground border-[oklch(0.85_0.08_22)]',
}

export const severityMeta: Record<
  'critical' | 'urgent' | 'standard',
  { label: string; className: string }
> = {
  critical: {
    label: 'Критично',
    className: 'bg-accent text-accent-foreground border-[oklch(0.85_0.08_22)]',
  },
  urgent: {
    label: 'Срочно',
    className:
      'bg-[oklch(0.96_0.06_75)] text-[oklch(0.45_0.13_60)] border-[oklch(0.85_0.1_75)]',
  },
  standard: {
    label: 'Плановое',
    className: 'bg-secondary text-secondary-foreground border-border',
  },
}
