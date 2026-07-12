'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const dropFactors = [
  { label: 'Обычная (20 кап/мл)', value: 20 },
  { label: 'Микрокапельница (60)', value: 60 },
  { label: 'Кровь (15 кап/мл)', value: 15 },
]

export function InfusionCalculator() {
  const [volume, setVolume] = useState('')
  const [minutes, setMinutes] = useState('')
  const [factor, setFactor] = useState(20)

  const v = Number.parseFloat(volume)
  const t = Number.parseFloat(minutes)
  const valid = Number.isFinite(v) && v > 0 && Number.isFinite(t) && t > 0

  const mlPerHour = valid ? (v / t) * 60 : 0
  const dropsPerMin = valid ? (v * factor) / t : 0

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="volume">Объём, мл</Label>
          <Input
            id="volume"
            type="number"
            inputMode="decimal"
            placeholder="500"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="minutes">Время, мин</Label>
          <Input
            id="minutes"
            type="number"
            inputMode="decimal"
            placeholder="60"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Тип системы</Label>
        <div className="flex flex-wrap gap-1.5">
          {dropFactors.map((f) => (
            <button
              key={f.value}
              onClick={() => setFactor(f.value)}
              className={cn(
                'rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
                factor === f.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:bg-accent/40',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {valid && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4">
            <span className="font-mono text-3xl font-bold text-primary">{Math.round(dropsPerMin)}</span>
            <span className="mt-1 text-xs text-muted-foreground">капель/мин</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-border bg-card p-4">
            <span className="font-mono text-3xl font-bold text-primary">{Math.round(mlPerHour)}</span>
            <span className="mt-1 text-xs text-muted-foreground">мл/час</span>
          </div>
        </div>
      )}

      <p className="rounded-lg bg-accent/40 p-3 text-[11px] leading-relaxed text-accent-foreground">
        Скорость = (объём × капельный фактор) / время. Настройте капель/мин визуально по контрольному счёту за 15 секунд (× 4).
      </p>
    </div>
  )
}
