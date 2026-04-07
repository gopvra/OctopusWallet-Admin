import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import type { Meta } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  meta?: Meta
  onPageChange?: (page: number) => void
  isLoading?: boolean
}

export function DataTable<T>({ data, columns, meta, onPageChange, isLoading }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-white/10 bg-secondary/50">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/5">
                  {columns.map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-secondary/50 rounded animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.total_pages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-secondary/30">
          <span className="text-xs text-muted-foreground">
            Showing {(meta.page - 1) * meta.per_page + 1}-{Math.min(meta.page * meta.per_page, meta.total)} of {meta.total}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(meta.page - 1)}
              disabled={meta.page <= 1}
              className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(meta.total_pages, 5) }, (_, i) => {
              const start = Math.max(1, Math.min(meta.page - 2, meta.total_pages - 4))
              const page = start + i
              if (page > meta.total_pages) return null
              return (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === meta.page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-white/5 text-muted-foreground'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => onPageChange?.(meta.page + 1)}
              disabled={meta.page >= meta.total_pages}
              className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
