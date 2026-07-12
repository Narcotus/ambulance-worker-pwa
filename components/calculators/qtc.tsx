'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calcQtc, hrToRr, interpretQtc } from '@/lib/data/calculators'
import { toneClasses } from '@/lib/tone'
import { cn } from '@/lib/utils'

export function QtcCalculator() {
  const [qt, setQt] = useState('')
  const [hr, setHr] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')

  const qtMs = Number.parseFloat(qt)
  const hrVal = Number.parseFloat(hr)
  const valid =
    Number.isFinite(qtMs) && qtMs > 0 && Number.isFinite(hrVal) && hrVal > 0

  const rr = valid ? hrToRr(hrVal) : 0
  const qtc = valid ? calcQtc(qtMs, rr) : 0
  const result = valid ? interpretQtc(qtc, sex) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="qt">Интервал QT, мс</Label>
          <Input
            id="qt"
            type="number"
            inputMode="decimal"
            placeholder="400"
            value={qt}
            onChange={(e) => setQt(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="hr">ЧСС, /мин</Label>
          <Input
            id="hr"
            type="number"
            inputMode="decimal"
            placeholder="75"
            value={hr}
            onChange={(e) => setHr(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Пол</Label>
        <div className="flex gap-1.5">
          {[
            { key: 'male' as const, label: 'Мужской' },
            { key: 'female' as const, label: 'Женский' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setSex(s.key)}
              className={cn(
                'flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                sex === s.key
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:bg-accent/40',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {valid && (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-muted-foreground">QTc (Bazett)</span>
            <span className="font-mono text-3xl font-bold text-primary">{Math.round(qtc)} мс</span>
          </div>
          {result && (
            <span className={cn('rounded-lg border px-3 py-2 text-sm font-medium', toneClasses[result.tone])}>
              {result.level}
            </span>
          )}
        </div>
      )}

      <p className="rounded-lg bg-accent/40 p-3 text-[11px] leading-relaxed text-accent-foreground">
        Формула Базетта: QTc = QT / √RR, где RR = 60 / ЧСС. Норма ориентировочно ≤ 450 мс (муж.) и ≤ 460 мс (жен.).
      </p>
    </div>
  )
}
