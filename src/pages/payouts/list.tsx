import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { usePayouts } from '@/hooks/use-payouts'
import { formatDate, formatAmount } from '@/lib/utils'
import { Search, Eye } from 'lucide-react'
import type { Payout } from '@/types'

const columnHelper = createColumnHelper<Payout>()

export default function PayoutListPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [chain, setChain] = useState('')

  const params: Record<string, string | number> = { page, per_page: 20 }
  if (search) params.search = search
  if (status) params.status = status
  if (chain) params.chain = chain

  const { data, isLoading } = usePayouts(params)

  const columns = [
    columnHelper.accessor('chain', {
      header: 'Chain',
      cell: (info) => <ChainBadge chain={info.getValue()} />,
    }),
    columnHelper.accessor('to_address', {
      header: 'To Address',
      cell: (info) => <AddressDisplay address={info.getValue()} />,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('created_at', {
      header: 'Created',
      cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Link
          to={`/payouts/${row.original.id}`}
          className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors inline-flex"
        >
          <Eye className="w-4 h-4" />
        </Link>
      ),
    }),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payouts</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search by address or ID..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={chain}
          onChange={(e) => { setChain(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Chains</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="tron">Tron</option>
          <option value="solana">Solana</option>
        </select>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        meta={data?.meta}
        onPageChange={setPage}
        isLoading={isLoading}
      />
    </div>
  )
}
