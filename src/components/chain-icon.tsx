import { cn } from '@/lib/utils'

const chainColors: Record<string, string> = {
  bitcoin: 'text-bitcoin bg-bitcoin/15',
  ethereum: 'text-ethereum bg-ethereum/15',
  bsc: 'text-ethereum bg-ethereum/15',
  polygon: 'text-purple-400 bg-purple-400/15',
  tron: 'text-tron bg-tron/15',
  solana: 'text-solana bg-solana/15',
}

const chainLabels: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  bsc: 'BSC',
  polygon: 'MATIC',
  tron: 'TRX',
  solana: 'SOL',
}

export function ChainIcon({ chain, size = 'sm' }: { chain: string; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'md' ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-xs'
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold',
        sizeClasses,
        chainColors[chain] || 'text-gray-400 bg-gray-400/15'
      )}
    >
      {(chainLabels[chain] || chain).slice(0, 3).toUpperCase()}
    </span>
  )
}

export function ChainBadge({ chain }: { chain: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <ChainIcon chain={chain} />
      <span className="text-sm capitalize">{chain}</span>
    </span>
  )
}
