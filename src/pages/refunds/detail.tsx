import { useParams, Link } from 'react-router-dom'
import { useRefund } from '@/hooks/use-refunds'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function RefundDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: refund, isLoading } = useRefund(id!)

  if (isLoading) return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  if (!refund) return <div className="text-center py-12 text-muted-foreground">Refund not found</div>

  const fields = [
    { label: 'ID', value: refund.id, mono: true },
    { label: 'Payment ID', value: refund.payment_id, mono: true },
    { label: 'Merchant ID', value: refund.merchant_id, mono: true },
    { label: 'Chain', value: <ChainBadge chain={refund.chain} /> },
    { label: 'Token', value: refund.token || 'Native' },
    { label: 'To Address', value: <AddressDisplay address={refund.to_address} chars={10} /> },
    { label: 'Amount', value: formatAmount(refund.amount), mono: true },
    { label: 'Status', value: <StatusBadge status={refund.status} /> },
    { label: 'Reason', value: refund.reason || 'N/A' },
    { label: 'TX Hash', value: refund.tx_hash ? <AddressDisplay address={refund.tx_hash} chars={10} /> : 'N/A' },
    { label: 'Error', value: refund.error_message || 'None' },
    { label: 'Created', value: formatDate(refund.created_at) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/refunds" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold">Refund Detail</h2>
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
