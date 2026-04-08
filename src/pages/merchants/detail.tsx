import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMerchant } from '@/hooks/use-merchants'
import { StatusBadge } from '@/components/status-badge'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Mail, Globe, Calendar } from 'lucide-react'

export default function MerchantDetailPage() {
  const { t } = useTranslation(['merchants', 'common'])
  const { id } = useParams<{ id: string }>()
  const { data: merchant, isLoading } = useMerchant(id!)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-secondary rounded animate-pulse" />
        <div className="h-64 bg-secondary rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!merchant) {
    return <div className="text-center py-12 text-muted-foreground">{t('merchants:detail.notFound')}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/merchants" className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">{merchant.name}</h2>
        <StatusBadge status={merchant.is_active ? 'completed' : 'expired'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">{t('merchants:detail.info')}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{merchant.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono">{merchant.webhook_url || t('merchants:detail.notSet')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('merchants:detail.fields.created', { date: formatDate(merchant.created_at) })}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-6 space-y-4">
          <h3 className="text-lg font-semibold">{t('merchants:detail.details')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('merchants:detail.fields.id')}</span>
              <span className="text-sm font-mono">{merchant.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('merchants:detail.fields.status')}</span>
              <span className="text-sm">{merchant.is_active ? t('merchants:detail.active') : t('merchants:detail.inactive')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('merchants:detail.fields.lastUpdated')}</span>
              <span className="text-sm">{formatDate(merchant.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
