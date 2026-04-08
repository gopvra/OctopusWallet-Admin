import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePayout } from '@/hooks/use-payouts'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function PayoutDetailPage() {
  const { t } = useTranslation(['payouts', 'common'])
  const { id } = useParams<{ id: string }>()
  const { data: payout, isLoading } = usePayout(id!)

  if (isLoading) {
    return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  }

  if (!payout) {
    return <div className="text-center py-12 text-muted-foreground">{t('payouts:detail.notFound')}</div>
  }

  const fields = [
    { label: t('payouts:detail.fields.id'), value: payout.id, mono: true },
    { label: t('payouts:detail.fields.merchantId'), value: payout.merchant_id, mono: true },
    { label: t('payouts:detail.fields.chain'), value: <ChainBadge chain={payout.chain} /> },
    { label: t('payouts:detail.fields.token'), value: payout.token || t('common:native') },
    { label: t('payouts:detail.fields.toAddress'), value: <AddressDisplay address={payout.to_address} chars={10} /> },
    { label: t('payouts:detail.fields.amount'), value: formatAmount(payout.amount), mono: true },
    { label: t('payouts:detail.fields.status'), value: <StatusBadge status={payout.status} /> },
    { label: t('payouts:detail.fields.txHash'), value: payout.tx_hash ? <AddressDisplay address={payout.tx_hash} chars={10} /> : t('common:na') },
    { label: t('payouts:detail.fields.error'), value: payout.error_message || t('common:none') },
    { label: t('payouts:detail.fields.created'), value: formatDate(payout.created_at) },
    { label: t('payouts:detail.fields.updated'), value: formatDate(payout.updated_at) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/payouts" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">{t('payouts:detail.title')}</h2>
        <StatusBadge status={payout.status} />
      </div>

      <div className="rounded-xl border border-white/10 bg-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(({ label, value, mono }) => (
            <div key={label} className="flex justify-between py-2 border-b border-white/5">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className={`text-sm ${mono ? 'font-mono' : ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
