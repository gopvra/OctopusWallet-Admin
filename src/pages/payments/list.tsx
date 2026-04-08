import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { usePayments } from '@/hooks/use-payments'
import { formatDate, formatAmount } from '@/lib/utils'
import { Search, Eye } from 'lucide-react'
import type { Payment } from '@/types'

const columnHelper = createColumnHelper<Payment>()

export default function PaymentListPage() {
  const { t } = useTranslation(['payments', 'common'])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [chain, setChain] = useState('')

  const params: Record<string, string | number> = { page, per_page: 20 }
  if (search) params.search = search
  if (status) params.status = status
  if (chain) params.chain = chain

  const { data, isLoading } = usePayments(params)

  const columns = [
    columnHelper.accessor('chain', {
      header: t('payments:list.columns.chain'),
      cell: (info) => <ChainBadge chain={info.getValue()} />,
    }),
    columnHelper.accessor('address', {
      header: t('payments:list.columns.address'),
      cell: (info) => <AddressDisplay address={info.getValue()} />,
    }),
    columnHelper.accessor('amount_expected', {
      header: t('payments:list.columns.expected'),
      cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span>,
    }),
    columnHelper.accessor('amount_received', {
      header: t('payments:list.columns.received'),
      cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span>,
    }),
    columnHelper.accessor('status', {
      header: t('payments:list.columns.status'),
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('created_at', {
      header: t('payments:list.columns.created'),
      cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Link
          to={`/payments/${row.original.id}`}
          className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors inline-flex"
        >
          <Eye className="w-4 h-4" />
        </Link>
      ),
    }),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('payments:list.title')}</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={t('payments:list.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{t('payments:list.statusOptions.all')}</option>
          <option value="pending">{t('payments:list.statusOptions.pending')}</option>
          <option value="confirming">{t('payments:list.statusOptions.confirming')}</option>
          <option value="completed">{t('payments:list.statusOptions.completed')}</option>
          <option value="expired">{t('payments:list.statusOptions.expired')}</option>
        </select>
        <select
          value={chain}
          onChange={(e) => { setChain(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{t('payments:list.chainOptions.all')}</option>
          <option value="bitcoin">{t('payments:list.chainOptions.bitcoin')}</option>
          <option value="ethereum">{t('payments:list.chainOptions.ethereum')}</option>
          <option value="tron">{t('payments:list.chainOptions.tron')}</option>
          <option value="solana">{t('payments:list.chainOptions.solana')}</option>
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
