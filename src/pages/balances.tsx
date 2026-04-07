import { useMerchantBalances } from '@/hooks/use-batch-payouts'
import { ChainIcon } from '@/components/chain-icon'
import { formatAmount } from '@/lib/utils'
import { Wallet } from 'lucide-react'

export default function BalancesPage() {
  const { data: balances, isLoading } = useMerchantBalances()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Merchant Balances</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-28 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      ) : balances && balances.length > 0 ? (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-secondary/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Merchant</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Chain</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Token</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Available</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Pending</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-2.5 px-4 font-mono text-xs text-muted-foreground">{b.merchant_id.slice(0, 8)}...</td>
                  <td className="py-2.5 px-4"><span className="inline-flex items-center gap-1.5"><ChainIcon chain={b.chain} /><span className="capitalize">{b.chain}</span></span></td>
                  <td className="py-2.5 px-4">{b.token || 'Native'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-emerald-400">{formatAmount(b.available)}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-amber-400">{formatAmount(b.pending)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-card p-12 text-center">
          <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No balance data available</p>
        </div>
      )}
    </div>
  )
}
