'use client'

import { useState } from 'react'
import { apgarCriteria, interpretApgar } from '@/lib/data/calculators'
import { toneClasses } from '@/lib/tone'
import { cn } from '@/lib/utils'

export function ApgarCalculator() {
  const [scores, setScores] = useState<Record<string, number>>({})

  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const complete = Object.keys(scores).length === apgarCriteria.length
  const result = complete ? interpretApgar(total) : null

  return (
    <div className="flex flex-col gap-4">
      {apgarCriteria.map((crit) => (
        <div key={crit.key} className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{crit.title}</span>
          <div className="grid grid-cols-3 gap-1.5">
            {crit.options.map((opt) => (
              <button
                key={opt.score}
                onClick={() => setScores((s) => ({ ...s, [crit.key]: opt.score }))}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center transition-colors',
                  scores[crit.key] === opt.score
                    ? 'border-primary bg-accent/60'
                    : 'border-border bg-card hover:bg-accent/30',
                )}
              >
                <span className="font-mono text-lg font-bold text-primary">{opt.score}</span>
                <span className="text-[11px] leading-tight text-muted-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-20 flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-muted-foreground">Оценка APGAR</span>
          <span className="font-mono text-3xl font-bold text-primary">
            {complete ? total : '—'}
            <span className="text-base text-muted-foreground">/10</span>
          </span>
        </div>
        {result && (
          <span className={cn('rounded-lg border px-3 py-2 text-sm font-medium', toneClasses[result.tone])}>
            {result.level}
          </span>
        )}
        {!complete && <span className="text-xs text-muted-foreground">Оцените все пять признаков.</span>}
      </div>
    </div>
  )
}
