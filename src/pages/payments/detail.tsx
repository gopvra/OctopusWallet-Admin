import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePayment } from '@/hooks/use-payments'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function PaymentDetailPage() {
  const { t } = useTranslation(['payments', 'common'])
  const { id } = useParams<{ id: string }>()
  const { data: payment, isLoading } = usePayment(id!)

  if (isLoading) {
    return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  }

  if (!payment) {
    return <div className="text-center py-12 text-muted-foreground">{t('payments:detail.notFound')}</div>
  }

  const fields = [
    { label: t('payments:detail.fields.id'), value: payment.id, mono: true },
    { label: t('payments:detail.fields.merchantId'), value: payment.merchant_id, mono: true },
    { label: t('payments:detail.fields.chain'), value: <ChainBadge chain={payment.chain} /> },
    { label: t('payments:detail.fields.token'), value: payment.token || t('common:native') },
    { label: t('payments:detail.fields.address'), value: <AddressDisplay address={payment.address} chars={10} /> },
    { label: t('payments:detail.fields.expected'), value: formatAmount(payment.amount_expected), mono: true },
    { label: t('payments:detail.fields.received'), value: formatAmount(payment.amount_received), mono: true },
    { label: t('payments:detail.fields.status'), value: <StatusBadge status={payment.status} /> },
    { label: t('payments:detail.fields.confirmations'), value: payment.confirmations },
    { label: t('payments:detail.fields.txHash'), value: payment.tx_hash ? <AddressDisplay address={payment.tx_hash} chars={10} /> : t('common:na') },
    { label: t('payments:detail.fields.expires'), value: payment.expires_at ? formatDate(payment.expires_at) : t('common:na') },
    { label: t('payments:detail.fields.created'), value: formatDate(payment.created_at) },
    { label: t('payments:detail.fields.updated'), value: formatDate(payment.updated_at) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/payments" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">{t('payments:detail.title')}</h2>
        <StatusBadge status={payment.status} />
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
