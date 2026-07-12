'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, FileText, Building2, CalendarDays } from 'lucide-react'
import { orders, type Order } from '@/lib/data/orders'

function matches(o: Order, q: string) {
  const hay = [o.number, o.title, o.issuer, o.category, o.summary, ...o.sections.flatMap((s) => [s.heading, s.body])]
    .join(' ')
    .toLowerCase()
  return hay.includes(q.toLowerCase())
}

export function OrdersView({ query }: { query: string }) {
  const [active, setActive] = useState<Order | null>(null)

  const list = useMemo(
    () => (query ? orders.filter((o) => matches(o, query)) : orders),
    [query],
  )

  if (active) {
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-1 self-start text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" /> Назад к списку
        </button>

        <header className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <span className="w-fit rounded-md bg-primary px-2 py-0.5 font-mono text-sm font-bold text-primary-foreground">
            {active.number}
          </span>
          <h2 className="text-balance text-lg font-bold leading-tight">{active.title}</h2>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="size-3.5" /> {active.issuer}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" /> {active.date}
            </span>
          </div>
        </header>

        <div className="flex flex-col gap-3">
          {active.sections.map((s) => (
            <section key={s.heading} className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-1.5 text-sm font-bold text-primary">{s.heading}</h3>
              <p className="text-sm leading-relaxed text-foreground/90">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <FileText className="size-5 text-primary" /> Приказы и постановления
      </h2>
      {list.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}
      {list.map((o) => (
        <button
          key={o.id}
          onClick={() => setActive(o)}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
                {o.number}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">{o.category}</span>
            </div>
            <span className="text-pretty text-sm font-semibold leading-tight">{o.title}</span>
            <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{o.summary}</span>
          </div>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  )
}
