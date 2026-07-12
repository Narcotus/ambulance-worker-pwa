'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { weightDrugs, calcWeightDose } from '@/lib/data/calculators'

export function WeightDoseCalculator() {
  const [weight, setWeight] = useState('')
  const w = Number.parseFloat(weight)
  const valid = Number.isFinite(w) && w > 0 && w <= 300

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="weight">Масса тела пациента, кг</Label>
        <Input
          id="weight"
          type="number"
          inputMode="decimal"
          placeholder="например, 18"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="h-12 text-lg"
        />
      </div>

      {!valid && weight !== '' && (
        <p className="text-sm text-primary">Введите массу в диапазоне 0–300 кг.</p>
      )}

      {valid && (
        <div className="flex flex-col gap-2">
          {weightDrugs.map((drug) => {
            const { capped, isCapped } = calcWeightDose(drug, w)
            const value = capped < 1 ? capped.toFixed(2) : capped.toFixed(1)
            return (
              <div
                key={drug.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold">{drug.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {drug.indication} · {drug.dosePerKg} {drug.unit}/кг
                  </span>
                  {drug.concentration && (
                    <span className="text-[11px] text-muted-foreground">{drug.concentration}</span>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <span className="font-mono text-lg font-bold text-primary">
                    {value} {drug.unit}
                  </span>
                  {isCapped && <span className="text-[10px] font-medium text-primary">макс. доза</span>}
                  {drug.note && !isCapped && (
                    <span className="text-[10px] text-muted-foreground">{drug.note}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="rounded-lg bg-accent/40 p-3 text-[11px] leading-relaxed text-accent-foreground">
        Расчёт носит справочный характер. Обязательно сверяйтесь с инструкцией к препарату и клиническим протоколом.
      </p>
    </div>
  )
}
