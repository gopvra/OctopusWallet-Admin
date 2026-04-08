import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation(['payouts', 'common'])
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [chain, setChain] = useState('')

  const params: Record<string, string | number> = { page, per_page: 20 }
  if (status) params.status = status
  if (chain) params.chain = chain

  const { data, isLoading } = useBatchPayouts(params)

  const columns = [
    columnHelper.accessor('chain', { header: t('payouts:batch.list.columns.chain'), cell: (info) => <ChainBadge chain={info.getValue()} /> }),
    columnHelper.accessor('total_amount', { header: t('payouts:batch.list.columns.total'), cell: (info) => <span className="font-mono">{formatAmount(info.getValue())}</span> }),
    columnHelper.accessor('total_count', { header: t('payouts:batch.list.columns.items'), cell: (info) => info.getValue() }),
    columnHelper.display({
      id: 'progress',
      header: t('payouts:batch.list.columns.progress'),
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
    columnHelper.accessor('status', { header: t('payouts:batch.list.columns.status'), cell: (info) => <StatusBadge status={info.getValue()} /> }),
    columnHelper.accessor('created_at', { header: t('payouts:batch.list.columns.created'), cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span> }),
    columnHelper.display({
      id: 'actions', header: '',
      cell: ({ row }) => (
        <Link to={`/batch-payouts/${row.original.id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors inline-flex"><Eye className="w-4 h-4" /></Link>
      ),
    }),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('payouts:batch.list.title')}</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">{t('payouts:batch.list.statusOptions.all')}</option>
          <option value="pending">{t('payouts:batch.list.statusOptions.pending')}</option>
          <option value="processing">{t('payouts:batch.list.statusOptions.processing')}</option>
          <option value="completed">{t('payouts:batch.list.statusOptions.completed')}</option>
          <option value="partial">{t('payouts:batch.list.statusOptions.partial')}</option>
          <option value="failed">{t('payouts:batch.list.statusOptions.failed')}</option>
        </select>
        <select value={chain} onChange={(e) => { setChain(e.target.value); setPage(1) }} className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">{t('payouts:batch.list.chainOptions.all')}</option>
          <option value="bitcoin">{t('payouts:batch.list.chainOptions.bitcoin')}</option>
          <option value="ethereum">{t('payouts:batch.list.chainOptions.ethereum')}</option>
          <option value="tron">{t('payouts:batch.list.chainOptions.tron')}</option>
          <option value="solana">{t('payouts:batch.list.chainOptions.solana')}</option>
        </select>
      </div>
      <DataTable data={data?.data ?? []} columns={columns} meta={data?.meta} onPageChange={setPage} isLoading={isLoading} />
    </div>
  )
}
