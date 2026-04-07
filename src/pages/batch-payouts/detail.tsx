import { useParams, Link } from 'react-router-dom'
import { useBatchPayout } from '@/hooks/use-batch-payouts'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { formatDate, formatAmount } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function BatchPayoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useBatchPayout(id!)

  if (isLoading) return <div className="h-64 bg-secondary rounded-xl animate-pulse" />
  if (!data) return <div className="text-center py-12 text-muted-foreground">Batch payout not found</div>

  const { batch, items } = data

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/batch-payouts" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold">Batch Payout</h2>
        <StatusBadge status={batch.status} />
      </div>

      <div className="rounded-xl border border-white/10 bg-card p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-xs text-muted-foreground">Chain</span><div className="mt-1"><ChainBadge chain={batch.chain} /></div></div>
          <div><span className="text-xs text-muted-foreground">Total Amount</span><p className="font-mono mt-1">{formatAmount(batch.total_amount)}</p></div>
          <div><span className="text-xs text-muted-foreground">Progress</span><p className="mt-1">{batch.completed_count}/{batch.total_count} completed</p></div>
          <div><span className="text-xs text-muted-foreground">Created</span><p className="text-sm mt-1">{formatDate(batch.created_at)}</p></div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="px-4 py-3 bg-secondary/50 border-b border-white/10">
          <h3 className="font-semibold text-sm">Payout Items ({items.length})</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase">To Address</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase">Amount</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground uppercase">Error</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-2.5 px-4"><AddressDisplay address={item.to_address} /></td>
                <td className="py-2.5 px-4 font-mono">{formatAmount(item.amount)}</td>
                <td className="py-2.5 px-4"><StatusBadge status={item.status} /></td>
                <td className="py-2.5 px-4 text-xs text-muted-foreground">{item.error_message || '-'}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No items</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
