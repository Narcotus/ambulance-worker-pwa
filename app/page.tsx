'use client'

import { useState } from 'react'
import { House, FileText, Stethoscope, Calculator, NotebookText, Search, X, WifiOff, Cross } from 'lucide-react'
import { HomeView } from '@/components/home-view'
import { OrdersView } from '@/components/orders-view'
import { GuidelinesView } from '@/components/guidelines-view'
import { CalculatorsView } from '@/components/calculators-view'
import { CheatsheetsView } from '@/components/cheatsheets-view'
import type { TabKey } from '@/lib/nav'
import { cn } from '@/lib/utils'

const navItems: { key: TabKey; label: string; icon: typeof House }[] = [
  { key: 'home', label: 'Главная', icon: House },
  { key: 'guidelines', label: 'Рекоменд.', icon: Stethoscope },
  { key: 'calculators', label: 'Калькул.', icon: Calculator },
  { key: 'orders', label: 'Приказы', icon: FileText },
  { key: 'cheatsheets', label: 'Шпаргалки', icon: NotebookText },
]

export default function Page() {
  const [tab, setTab] = useState<TabKey>('home')
  const [query, setQuery] = useState('')

  const goTo = (t: TabKey) => {
    setTab(t)
    setQuery('')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cross className="size-5" strokeWidth={2.5} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="text-sm font-bold leading-tight">СМП Ассистент</h1>
            <span className="text-[11px] leading-tight text-muted-foreground">Справочник фельдшера</span>
          </div>
          <span className="flex items-center gap-1 rounded-full border border-[oklch(0.85_0.08_145)] bg-[oklch(0.95_0.05_145)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.4_0.12_145)]">
            <WifiOff className="size-3" /> Оффлайн
          </span>
        </div>

        {tab !== 'home' && (
          <div className="px-4 pb-3">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск в разделе..."
                className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm outline-none ring-ring/40 focus:ring-2"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2 flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary"
                  aria-label="Очистить поиск"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-5 pb-28">
        {tab === 'home' && <HomeView onNavigate={goTo} />}
        {tab === 'orders' && <OrdersView query={query} />}
        {tab === 'guidelines' && <GuidelinesView query={query} />}
        {tab === 'calculators' && <CalculatorsView query={query} />}
        {tab === 'cheatsheets' && <CheatsheetsView query={query} />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-lg border-t border-border bg-card/95 backdrop-blur">
        <div className="flex items-stretch">
          {navItems.map((item) => {
            const activeTab = tab === item.key
            return (
              <button
                key={item.key}
                onClick={() => goTo(item.key)}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  activeTab ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <item.icon className="size-5" strokeWidth={activeTab ? 2.5 : 2} />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
