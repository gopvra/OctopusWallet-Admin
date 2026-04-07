import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { useBatchPayouts } from '@/hooks/use-batch-payouts'
import { formatDate, formatAmount } from '@/lib/utils'
import { Search, Eye } from 'lucide-react'
import type { BatchPayout } from '@/types'

const columnHelper = createColumnHelper<BatchPayout>()

export default function BatchPayoutListPage() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [chain, setChain] = useState('')

  const params: Record<string, string | number> = { page, per_page: 20 }
  if (status) params.status = status
  if (chain) params.chain = chain

  const { data, isLoading } = useBatchPayouts(params)

  const columns = [
    columnHelper.accessor('chain', { header: 'Chain', cell: (info) => <ChainBadge chain={info.getValue()} /> }),
    columnHelper.accessor('total_amount', { header: 'Total', cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span> }),
    columnHelper.accessor('total_count', { header: 'Items', cell: (info) => info.getValue() }),
    columnHelper.display({
      id: 'progress',
      header: 'Progress',
      cell: ({ row }) => {
        const { completed_count, failed_count, total_count } = row.original
        return (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400">{completed_count}</span>
            <span className="text-muted-foreground">/</span>
            {failed_count > 0 && <><span className="text-red-400">{failed_count}</span><span className="text-muted-foreground">/</span></>}
            <span>{total_count}</span>
          </div>
        )
      },
    }),
    columnHelper.accessor('status', { header: 'Status', cell: (info) => <StatusBadge status={info.getValue()} /> }),
    columnHelper.accessor('created_at', { header: 'Created', cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span> }),
    columnHelper.display({
      id: 'actions', header: '',
      cell: ({ row }) => (
        <Link to={`/batch-payouts/${row.original.id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors inline-flex"><Eye className="w-4 h-4" /></Link>
      ),
    }),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Batch Payouts</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="partial">Partial</option>
          <option value="failed">Failed</option>
        </select>
        <select value={chain} onChange={(e) => { setChain(e.target.value); setPage(1) }} className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Chains</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
          <option value="solana">Solana</option>
        </select>
      </div>
      <DataTable data={data?.data ?? []} columns={columns} meta={data?.meta} onPageChange={setPage} isLoading={isLoading} />
    </div>
  )
}
