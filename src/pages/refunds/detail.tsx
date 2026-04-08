import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRefund } from '@/hooks/use-refunds'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function RefundDetailPage() {
  const { t } = useTranslation(['refunds', 'common'])
  const { id } = useParams<{ id: string }>()
  const { data: refund, isLoading } = useRefund(id!)

  if (isLoading) return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  if (!refund) return <div className="text-center py-12 text-muted-foreground">{t('refunds:detail.notFound')}</div>

  const fields = [
    { label: t('refunds:detail.fields.id'), value: refund.id, mono: true },
    { label: t('refunds:detail.fields.paymentId'), value: refund.payment_id, mono: true },
    { label: t('refunds:detail.fields.merchantId'), value: refund.merchant_id, mono: true },
    { label: t('refunds:detail.fields.chain'), value: <ChainBadge chain={refund.chain} /> },
    { label: t('refunds:detail.fields.token'), value: refund.token || t('common:native') },
    { label: t('refunds:detail.fields.toAddress'), value: <AddressDisplay address={refund.to_address} chars={10} /> },
    { label: t('refunds:detail.fields.amount'), value: formatAmount(refund.amount), mono: true },
    { label: t('refunds:detail.fields.status'), value: <StatusBadge status={refund.status} /> },
    { label: t('refunds:detail.fields.reason'), value: refund.reason || t('common:na') },
    { label: t('refunds:detail.fields.txHash'), value: refund.tx_hash ? <AddressDisplay address={refund.tx_hash} chars={10} /> : t('common:na') },
    { label: t('refunds:detail.fields.error'), value: refund.error_message || t('common:none') },
    { label: t('refunds:detail.fields.created'), value: formatDate(refund.created_at) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/refunds" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold">{t('refunds:detail.title')}</h2>
        <StatusBadge status={refund.status} />
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
