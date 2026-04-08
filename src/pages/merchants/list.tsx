import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { useMerchants, useToggleMerchant } from '@/hooks/use-merchants'
import { formatDate } from '@/lib/utils'
import { Search, Eye, Power } from 'lucide-react'
import type { Merchant } from '@/types'

const columnHelper = createColumnHelper<Merchant>()

export default function MerchantListPage() {
  const { t } = useTranslation(['merchants', 'common'])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading } = useMerchants({ page, per_page: 20, search })
  const toggleMerchant = useToggleMerchant()

  const columns = [
    columnHelper.accessor('name', {
      header: t('merchants:list.columns.name'),
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: t('merchants:list.columns.email'),
      cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor('is_active', {
      header: t('merchants:list.columns.status'),
      cell: (info) => <StatusBadge status={info.getValue() ? 'completed' : 'expired'} />,
    }),
    columnHelper.accessor('created_at', {
      header: t('merchants:list.columns.created'),
      cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: t('merchants:list.columns.actions'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/merchants/${row.original.id}`}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => toggleMerchant.mutate(row.original.id)}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${
              row.original.is_active ? 'text-emerald-400 hover:text-red-400' : 'text-red-400 hover:text-emerald-400'
            }`}
            title={row.original.is_active ? t('merchants:list.deactivate') : t('merchants:list.activate')}
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      ),
    }),
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('merchants:list.title')}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={t('merchants:list.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
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
