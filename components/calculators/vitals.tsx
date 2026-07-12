'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calcBmi, interpretBmi, calcBsa } from '@/lib/data/calculators'
import { toneClasses } from '@/lib/tone'
import { cn } from '@/lib/utils'

export function VitalsCalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const w = Number.parseFloat(weight)
  const h = Number.parseFloat(height)
  const valid = Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0

  const bmi = valid ? calcBmi(w, h) : 0
  const bsa = valid ? calcBsa(w, h) : 0
  const result = valid ? interpretBmi(bmi) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="v-weight">Масса тела, кг</Label>
          <Input
            id="v-weight"
            type="number"
            inputMode="decimal"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="v-height">Рост, см</Label>
          <Input
            id="v-height"
            type="number"
            inputMode="decimal"
            placeholder="175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
      </div>

      {valid && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4">
            <span className="font-mono text-3xl font-bold text-primary">{bmi.toFixed(1)}</span>
            <span className="mt-1 text-xs text-muted-foreground">ИМТ, кг/м²</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4">
            <span className="font-mono text-3xl font-bold text-primary">{bsa.toFixed(2)}</span>
            <span className="mt-1 text-xs text-muted-foreground">ППТ, м²</span>
          </div>
        </div>
      )}

      {result && (
        <span className={cn('rounded-lg border px-3 py-2 text-center text-sm font-medium', toneClasses[result.tone])}>
          {result.level}
        </span>
      )}

      <p className="rounded-lg bg-accent/40 p-3 text-[11px] leading-relaxed text-accent-foreground">
        Площадь поверхности тела рассчитывается по формуле Мостеллера: ППТ = √(масса × рост / 3600).
      </p>
    </div>
  )
}
