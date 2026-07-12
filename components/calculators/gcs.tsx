'use client'

import { useState } from 'react'
import { gcsCategories, interpretGcs } from '@/lib/data/calculators'
import { toneClasses } from '@/lib/tone'
import { cn } from '@/lib/utils'

export function GcsCalculator() {
  const [scores, setScores] = useState<Record<string, number>>({})

  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const complete = Object.keys(scores).length === gcsCategories.length
  const result = complete ? interpretGcs(total) : null

  return (
    <div className="flex flex-col gap-4">
      {gcsCategories.map((cat) => (
        <div key={cat.key} className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{cat.title}</span>
          <div className="flex flex-col gap-1.5">
            {cat.options.map((opt) => (
              <button
                key={opt.score}
                onClick={() => setScores((s) => ({ ...s, [cat.key]: opt.score }))}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors',
                  scores[cat.key] === opt.score
                    ? 'border-primary bg-accent/60 font-medium'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent/30',
                )}
              >
                <span>{opt.label}</span>
                <span className="font-mono font-bold text-primary">{opt.score}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-20 flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-muted-foreground">Сумма баллов</span>
          <span className="font-mono text-3xl font-bold text-primary">
            {complete ? total : '—'}
            <span className="text-base text-muted-foreground">/15</span>
          </span>
        </div>
        {result && (
          <span className={cn('rounded-lg border px-3 py-2 text-sm font-medium', toneClasses[result.tone])}>
            {result.level}
          </span>
        )}
        {!complete && <span className="text-xs text-muted-foreground">Выберите значение в каждой категории.</span>}
      </div>
    </div>
  )
}
