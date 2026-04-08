import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'
import { ChainBadge } from '@/components/chain-icon'
import { AddressDisplay } from '@/components/address-display'
import { useWallets } from '@/hooks/use-wallets'
import { formatDate } from '@/lib/utils'
import { Search } from 'lucide-react'
import type { Wallet } from '@/types'

const columnHelper = createColumnHelper<Wallet>()

export default function WalletsPage() {
  const { t } = useTranslation(['settings', 'common'])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [chain, setChain] = useState('')

  const params: Record<string, string | number> = { page, per_page: 20 }
  if (search) params.search = search
  if (chain) params.chain = chain

  const { data, isLoading } = useWallets(params)

  const columns = [
    columnHelper.accessor('chain', {
      header: t('settings:wallets.columns.chain'),
      cell: (info) => <ChainBadge chain={info.getValue()} />,
    }),
    columnHelper.accessor('address', {
      header: t('settings:wallets.columns.address'),
      cell: (info) => <AddressDisplay address={info.getValue()} chars={8} />,
    }),
    columnHelper.accessor('merchant_id', {
      header: t('settings:wallets.columns.merchant'),
      cell: (info) => <span className="font-mono text-xs text-muted-foreground">{info.getValue().slice(0, 8)}...</span>,
    }),
    columnHelper.accessor('derivation_index', {
      header: t('settings:wallets.columns.index'),
      cell: (info) => <span className="font-mono">{info.getValue()}</span>,
    }),
    columnHelper.accessor('created_at', {
      header: t('settings:wallets.columns.created'),
      cell: (info) => <span className="text-muted-foreground text-xs">{formatDate(info.getValue())}</span>,
    }),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('settings:wallets.title')}</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={t('settings:wallets.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
        </div>
        <select
          value={chain}
          onChange={(e) => { setChain(e.target.value); setPage(1) }}
          className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">{t('settings:wallets.chainOptions.all')}</option>
          <option value="bitcoin">{t('settings:wallets.chainOptions.bitcoin')}</option>
          <option value="ethereum">{t('settings:wallets.chainOptions.ethereum')}</option>
          <option value="tron">{t('settings:wallets.chainOptions.tron')}</option>
          <option value="solana">{t('settings:wallets.chainOptions.solana')}</option>
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
