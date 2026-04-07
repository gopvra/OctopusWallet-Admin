import { useState } from 'react'
import { truncateAddress } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

export function AddressDisplay({ address, chars = 6 }: { address: string; chars?: number }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm">
      <span className="text-muted-foreground">{truncateAddress(address, chars)}</span>
      <button
        onClick={copy}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </span>
  )
}
