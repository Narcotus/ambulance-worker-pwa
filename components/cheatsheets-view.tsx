'use client'

import { useMemo, useState } from 'react'
import { NotebookText } from 'lucide-react'
import { cheatsheets, type Cheatsheet } from '@/lib/data/cheatsheets'
import { cn } from '@/lib/utils'

function matches(c: Cheatsheet, q: string) {
  const hay = [c.title, c.category, c.description, c.note ?? '', c.table.columns.join(' '), c.table.rows.flat().join(' ')]
    .join(' ')
    .toLowerCase()
  return hay.includes(q.toLowerCase())
}

const categories = ['Все', 'Препараты', 'Нормы', 'Алгоритмы', 'Шкалы', 'Дети'] as const

export function CheatsheetsView({ query }: { query: string }) {
  const [cat, setCat] = useState<(typeof categories)[number]>('Все')

  const list = useMemo(() => {
    let l = cheatsheets
    if (cat !== 'Все') l = l.filter((c) => c.category === cat)
    if (query) l = l.filter((c) => matches(c, query))
    return l
  }, [query, cat])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <NotebookText className="size-5 text-primary" /> Шпаргалки
      </h2>

      <div className="-mx-1 flex flex-wrap gap-1.5 px-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              cat === c
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:bg-accent/40',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="text-sm text-muted-foreground">Ничего не найдено.</p>}

      <div className="flex flex-col gap-4">
        {list.map((c) => (
          <section key={c.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-1 border-b border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-pretty text-sm font-bold leading-tight">{c.title}</h3>
                <span className="shrink-0 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                  {c.category}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{c.description}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-secondary/60">
                    {c.table.columns.map((col) => (
                      <th key={col} className="whitespace-nowrap px-3 py-2 font-semibold text-secondary-foreground">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.table.rows.map((row, ri) => (
                    <tr key={ri} className="border-t border-border">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={cn(
                            'px-3 py-2 align-top leading-snug',
                            ci === 0 ? 'font-medium text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {c.note && (
              <p className="border-t border-border bg-accent/30 px-4 py-2.5 text-[11px] leading-relaxed text-accent-foreground">
                {c.note}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
