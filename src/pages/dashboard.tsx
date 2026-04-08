import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Users, CreditCard, ArrowUpRight, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { StatCard } from '@/components/stat-card'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { useDashboardStats, useVolumeChart, useChainDistribution, useRecentActivity } from '@/hooks/use-dashboard'
import { formatAmount, formatDate } from '@/lib/utils'

const CHAIN_COLORS: Record<string, string> = {
  bitcoin: '#f7931a',
  ethereum: '#627eea',
  tron: '#ff0013',
  solana: '#9945ff',
  bsc: '#f3ba2f',
  polygon: '#8247e5',
}

export default function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const [days, setDays] = useState(7)
  const { data: stats } = useDashboardStats()
  const { data: volumeData } = useVolumeChart(days)
  const { data: chainDist } = useChainDistribution()
  const { data: recentActivity } = useRecentActivity(10)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('dashboard:title')}</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard:stats.totalMerchants')}
          value={stats?.total_merchants ?? 0}
          subtitle={t('dashboard:stats.activeMerchants', { count: stats?.active_merchants ?? 0 })}
          icon={<Users className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-indigo-500/20 to-indigo-900/20"
        />
        <StatCard
          title={t('dashboard:stats.totalPayments')}
          value={stats?.total_payments ?? 0}
          subtitle={t('dashboard:stats.pendingPayments', { count: stats?.pending_payments ?? 0 })}
          icon={<CreditCard className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-cyan-500/20 to-cyan-900/20"
        />
        <StatCard
          title={t('dashboard:stats.totalPayouts')}
          value={stats?.total_payouts ?? 0}
          subtitle={t('dashboard:stats.pendingPayouts', { count: stats?.pending_payouts ?? 0 })}
          icon={<ArrowUpRight className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-purple-500/20 to-purple-900/20"
        />
        <StatCard
          title={t('dashboard:stats.totalVolume')}
          value={formatAmount(stats?.total_volume ?? '0')}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="bg-gradient-to-br from-emerald-500/20 to-emerald-900/20"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{t('dashboard:charts.paymentVolume')}</h3>
            <div className="flex gap-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    days === d ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-white/5'
                  }`}
                >
                  {t('dashboard:days', { count: d })}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={volumeData || []}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#volumeGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chain Distribution */}
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard:charts.chainDistribution')}</h3>
          {chainDist && chainDist.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={chainDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="count"
                    nameKey="chain"
                  >
                    {chainDist.map((entry) => (
                      <Cell key={entry.chain} fill={CHAIN_COLORS[entry.chain] || '#475569'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {chainDist.map((item) => (
                  <div key={item.chain} className="flex items-center justify-between text-sm">
                    <ChainBadge chain={item.chain} />
                    <span className="text-muted-foreground">{item.count} {t('common:txns')}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
              {t('dashboard:charts.noData')}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-white/10 bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">{t('dashboard:recentActivity.title')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">{t('dashboard:recentActivity.type')}</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">{t('dashboard:recentActivity.chain')}</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">{t('dashboard:recentActivity.amount')}</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">{t('dashboard:recentActivity.status')}</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">{t('dashboard:recentActivity.time')}</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.type === 'payment' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {item.type === 'payment' ? t('common:payment') : t('common:payout')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3"><ChainBadge chain={item.chain} /></td>
                    <td className="py-2.5 px-3 font-mono">{formatAmount(item.amount)}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={item.status} /></td>
                    <td className="py-2.5 px-3 text-muted-foreground">{formatDate(item.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">{t('dashboard:recentActivity.noActivity')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
