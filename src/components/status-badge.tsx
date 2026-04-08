import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  confirming: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  expired: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  failed: 'bg-red-500/15 text-red-400 border-red-500/30',
  processing: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

const statusKeys: Record<string, string> = {
  pending: 'common:status.pending',
  confirming: 'common:status.confirming',
  completed: 'common:status.completed',
  expired: 'common:status.expired',
  failed: 'common:status.failed',
  processing: 'common:status.processing',
  approved: 'common:status.approved',
  rejected: 'common:status.rejected',
  partial: 'common:status.partial',
  active: 'common:status.active',
  inactive: 'common:status.inactive',
}

export function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation(['common'])

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status] || 'bg-gray-500/15 text-gray-400 border-gray-500/30'
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {statusKeys[status] ? t(statusKeys[status]) : status}
    </span>
  )
}
