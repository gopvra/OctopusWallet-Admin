import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation(['payouts', 'common'])
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
      header: t('payouts:list.columns.chain'),
      cell: (info) => <ChainBadge chain={info.getValue()} />,
    }),
    columnHelper.accessor('to_address', {
      header: t('payouts:list.columns.toAddress'),
      cell: (info) => <AddressDisplay address={info.getValue()} />,
    }),
    columnHelper.accessor('amount', {
      header: t('payouts:list.columns.amount'),
      cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span>,
    }),
    columnHelper.accessor('status', {
      header: t('payouts:list.columns.status'),
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('created_at', {
      header: t('payouts:list.columns.created'),
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
      <h2 className="text-2xl font-bold">{t('payouts:list.title')}</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={t('payouts:list.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{t('payouts:list.statusOptions.all')}</option>
          <option value="pending">{t('payouts:list.statusOptions.pending')}</option>
          <option value="processing">{t('payouts:list.statusOptions.processing')}</option>
          <option value="completed">{t('payouts:list.statusOptions.completed')}</option>
          <option value="failed">{t('payouts:list.statusOptions.failed')}</option>
        </select>
        <select
          value={chain}
          onChange={(e) => { setChain(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{t('payouts:list.chainOptions.all')}</option>
          <option value="bitcoin">{t('payouts:list.chainOptions.bitcoin')}</option>
          <option value="ethereum">{t('payouts:list.chainOptions.ethereum')}</option>
          <option value="tron">{t('payouts:list.chainOptions.tron')}</option>
          <option value="solana">{t('payouts:list.chainOptions.solana')}</option>
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
