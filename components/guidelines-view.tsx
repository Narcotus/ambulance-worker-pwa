'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react'
import { guidelines, type Guideline } from '@/lib/data/guidelines'
import { severityMeta } from '@/lib/tone'
import { cn } from '@/lib/utils'

function matches(g: Guideline, q: string) {
  const hay = [g.title, g.category, g.summary, ...g.blocks.flatMap((b) => [b.heading, ...b.steps.flatMap((s) => [s.label, s.detail])])]
    .join(' ')
    .toLowerCase()
  return hay.includes(q.toLowerCase())
}

export function GuidelinesView({ query }: { query: string }) {
  const [active, setActive] = useState<Guideline | null>(null)

  const list = useMemo(
    () => (query ? guidelines.filter((g) => matches(g, query)) : guidelines),
    [query],
  )

  if (active) {
    const meta = severityMeta[active.severity]
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-1 self-start text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" /> Назад к списку
        </button>

        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold', meta.className)}>
              {meta.label}
            </span>
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {active.category}
            </span>
          </div>
          <h2 className="text-balance text-xl font-bold leading-tight">{active.title}</h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
        </header>

        <div className="flex flex-col gap-4">
          {active.blocks.map((block) => (
            <section key={block.heading} className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{block.heading}</h3>
              <ol className="flex flex-col gap-3">
                {block.steps.map((step, i) => (
                  <li key={step.label} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{step.label}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{step.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Stethoscope className="size-5 text-primary" /> Клинические рекомендации
      </h2>
      {list.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}
      {list.map((g) => {
        const meta = severityMeta[g.severity]
        return (
          <button
            key={g.id}
            onClick={() => setActive(g)}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn('rounded-full border px-2 py-0.5 text-[11px] font-semibold', meta.className)}>
                  {meta.label}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">{g.category}</span>
              </div>
              <span className="text-pretty text-sm font-semibold leading-tight">{g.title}</span>
              <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{g.summary}</span>
            </div>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
          </button>
        )
      })}
    </div>
  )
}
