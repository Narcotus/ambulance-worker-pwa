'use client'

import { FileText, Stethoscope, Calculator, NotebookText, Siren, ChevronRight } from 'lucide-react'
import { guidelines } from '@/lib/data/guidelines'
import type { TabKey } from '@/lib/nav'

const tiles: { tab: TabKey; title: string; desc: string; icon: typeof FileText }[] = [
  { tab: 'guidelines', title: 'Клинические рекомендации', desc: 'Протоколы неотложных состояний', icon: Stethoscope },
  { tab: 'calculators', title: 'Калькуляторы', desc: 'Дозы, шкалы, инфузия, QTc', icon: Calculator },
  { tab: 'orders', title: 'Приказы', desc: 'Нормативные документы', icon: FileText },
  { tab: 'cheatsheets', title: 'Шпаргалки', desc: 'Таблицы и быстрые ориентиры', icon: NotebookText },
]

export function HomeView({ onNavigate }: { onNavigate: (tab: TabKey) => void }) {
  const critical = guidelines.filter((g) => g.severity === 'critical').slice(0, 4)

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Siren className="size-5 text-primary" />
          <h2 className="text-lg font-bold">Экстренные протоколы</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {critical.map((g) => (
            <button
              key={g.id}
              onClick={() => onNavigate('guidelines')}
              className="flex flex-col gap-1 rounded-xl border border-[oklch(0.85_0.08_22)] bg-accent/50 p-3.5 text-left transition-colors hover:bg-accent"
            >
              <span className="text-sm font-bold leading-tight text-accent-foreground">{g.title}</span>
              <span className="text-[11px] text-muted-foreground">{g.category}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Разделы</h2>
        <div className="flex flex-col gap-2.5">
          {tiles.map((t) => (
            <button
              key={t.tab}
              onClick={() => onNavigate(t.tab)}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <t.icon className="size-6" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-semibold leading-tight">{t.title}</span>
                <span className="text-xs text-muted-foreground">{t.desc}</span>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
