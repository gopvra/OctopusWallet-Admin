import { useSupportedCurrencies } from '@/hooks/use-batch-payouts'
import { ChainIcon } from '@/components/chain-icon'
import { Coins } from 'lucide-react'

export default function CurrenciesPage() {
  const { data: currencies, isLoading } = useSupportedCurrencies()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Supported Currencies</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      ) : currencies && currencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencies.map((c) => (
            <div key={c.id} className="rounded-xl border border-white/10 bg-card p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <ChainIcon chain={c.chain} size="md" />
                <div>
                  <p className="font-semibold">{c.symbol}</p>
                  <p className="text-xs text-muted-foreground">{c.name}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  {c.is_native && <span className="px-2 py-0.5 rounded text-xs bg-primary/15 text-primary">Native</span>}
                  <span className={`px-2 py-0.5 rounded text-xs ${c.is_active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {c.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Chain</span>
                  <p className="capitalize">{c.chain}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Decimals</span>
                  <p>{c.decimals}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-card p-12 text-center">
          <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No currencies configured</p>
        </div>
      )}
    </div>
  )
}
