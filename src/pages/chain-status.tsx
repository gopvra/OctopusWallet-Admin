import { useChainStates } from '@/hooks/use-wallets'
import { ChainIcon } from '@/components/chain-icon'
import { formatDate } from '@/lib/utils'
import { Activity, Box } from 'lucide-react'

const chainInfo: Record<string, { name: string; color: string }> = {
  bitcoin: { name: 'Bitcoin', color: 'from-bitcoin/20 to-bitcoin/5' },
  ethereum: { name: 'Ethereum', color: 'from-ethereum/20 to-ethereum/5' },
  bsc: { name: 'BSC', color: 'from-yellow-500/20 to-yellow-500/5' },
  polygon: { name: 'Polygon', color: 'from-purple-500/20 to-purple-500/5' },
  tron: { name: 'Tron', color: 'from-tron/20 to-tron/5' },
  solana: { name: 'Solana', color: 'from-solana/20 to-solana/5' },
}

export default function ChainStatusPage() {
  const { data: states, isLoading } = useChainStates()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chain Status</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-secondary rounded-xl animate-pulse" />
          ))}
        </div>
      ) : states && states.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => {
            const info = chainInfo[state.chain] || { name: state.chain, color: 'from-gray-500/20 to-gray-500/5' }
            return (
              <div
                key={state.chain}
                className={`rounded-xl border border-white/10 p-6 bg-gradient-to-br ${info.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <ChainIcon chain={state.chain} size="md" />
                  <div>
                    <h3 className="font-semibold capitalize">{info.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400">Syncing</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5" />
                      Last Block
                    </span>
                    <span className="font-mono text-sm">{state.last_scanned_block.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Updated
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(state.updated_at)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-card p-12 text-center">
          <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No chain state data available</p>
          <p className="text-xs text-muted-foreground mt-1">Chain states will appear once the monitor starts scanning</p>
        </div>
      )}
    </div>
  )
}
