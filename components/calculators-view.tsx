'use client'

import { useMemo, useState, type ComponentType } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Scale,
  Droplets,
  Brain,
  Baby,
  HeartPulse,
  Ruler,
} from 'lucide-react'
import { WeightDoseCalculator } from '@/components/calculators/weight-dose'
import { InfusionCalculator } from '@/components/calculators/infusion'
import { GcsCalculator } from '@/components/calculators/gcs'
import { ApgarCalculator } from '@/components/calculators/apgar'
import { QtcCalculator } from '@/components/calculators/qtc'
import { VitalsCalculator } from '@/components/calculators/vitals'
import type { LucideIcon } from 'lucide-react'

interface CalcDef {
  id: string
  title: string
  desc: string
  icon: LucideIcon
  Component: ComponentType
}

const calculators: CalcDef[] = [
  { id: 'weight', title: 'Дозировки по массе тела', desc: 'Расчёт доз препаратов, детские дозы', icon: Scale, Component: WeightDoseCalculator },
  { id: 'infusion', title: 'Скорость инфузии', desc: 'Капель/мин и мл/час', icon: Droplets, Component: InfusionCalculator },
  { id: 'gcs', title: 'Шкала комы Глазго (GCS)', desc: 'Оценка уровня сознания', icon: Brain, Component: GcsCalculator },
  { id: 'apgar', title: 'Шкала APGAR', desc: 'Оценка состояния новорождённого', icon: Baby, Component: ApgarCalculator },
  { id: 'qtc', title: 'Интервал QTc', desc: 'Формула Базетта, интерпретация', icon: HeartPulse, Component: QtcCalculator },
  { id: 'vitals', title: 'ИМТ и площадь тела', desc: 'Витальные антропометрические индексы', icon: Ruler, Component: VitalsCalculator },
]

export function CalculatorsView({ query }: { query: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const list = useMemo(() => {
    if (!query) return calculators
    const q = query.toLowerCase()
    return calculators.filter((c) => (c.title + ' ' + c.desc).toLowerCase().includes(q))
  }, [query])

  const active = calculators.find((c) => c.id === activeId)

  if (active) {
    const ActiveComponent = active.Component
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActiveId(null)}
          className="flex items-center gap-1 self-start text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" /> Все калькуляторы
        </button>
        <header className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <active.icon className="size-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-balance text-lg font-bold leading-tight">{active.title}</h2>
            <span className="text-xs text-muted-foreground">{active.desc}</span>
          </div>
        </header>
        <ActiveComponent />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Calculator className="size-5 text-primary" /> Медицинские калькуляторы
      </h2>
      {list.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}
      {list.map((c) => (
        <button
          key={c.id}
          onClick={() => setActiveId(c.id)}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <c.icon className="size-6" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold leading-tight">{c.title}</span>
            <span className="text-xs text-muted-foreground">{c.desc}</span>
          </div>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  )
}
