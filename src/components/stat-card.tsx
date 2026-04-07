import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  gradient: string
}

export function StatCard({ title, value, subtitle, icon, gradient }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 p-6 ${gradient}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="rounded-lg bg-white/5 p-3 text-primary">{icon}</div>
      </div>
      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-white/5" />
    </div>
  )
}
