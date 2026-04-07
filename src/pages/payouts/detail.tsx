import { useParams, Link } from 'react-router-dom'
import { usePayout } from '@/hooks/use-payouts'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function PayoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: payout, isLoading } = usePayout(id!)

  if (isLoading) {
    return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  }

  if (!payout) {
    return <div className="text-center py-12 text-muted-foreground">Payout not found</div>
  }

  const fields = [
    { label: 'ID', value: payout.id, mono: true },
    { label: 'Merchant ID', value: payout.merchant_id, mono: true },
    { label: 'Chain', value: <ChainBadge chain={payout.chain} /> },
    { label: 'Token', value: payout.token || 'Native' },
    { label: 'To Address', value: <AddressDisplay address={payout.to_address} chars={10} /> },
    { label: 'Amount', value: formatAmount(payout.amount), mono: true },
    { label: 'Status', value: <StatusBadge status={payout.status} /> },
    { label: 'TX Hash', value: payout.tx_hash ? <AddressDisplay address={payout.tx_hash} chars={10} /> : 'N/A' },
    { label: 'Error', value: payout.error_message || 'None' },
    { label: 'Created', value: formatDate(payout.created_at) },
    { label: 'Updated', value: formatDate(payout.updated_at) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/payouts" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">Payout Detail</h2>
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
