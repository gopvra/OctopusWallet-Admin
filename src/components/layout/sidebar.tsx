import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowUpRight,
  Wallet,
  Link2,
  Settings,
  RotateCcw,
  Layers,
  PiggyBank,
  Coins,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  to: string
  icon: LucideIcon
  i18nKey: string
}

const navItems: NavItem[] = [
  { to: '/', icon: LayoutDashboard, i18nKey: 'dashboard' },
  { to: '/merchants', icon: Users, i18nKey: 'merchants' },
  { to: '/payments', icon: CreditCard, i18nKey: 'payments' },
  { to: '/payouts', icon: ArrowUpRight, i18nKey: 'payouts' },
  { to: '/refunds', icon: RotateCcw, i18nKey: 'refunds' },
  { to: '/batch-payouts', icon: Layers, i18nKey: 'batchPayouts' },
  { to: '/wallets', icon: Wallet, i18nKey: 'wallets' },
  { to: '/balances', icon: PiggyBank, i18nKey: 'balances' },
  { to: '/currencies', icon: Coins, i18nKey: 'currencies' },
  { to: '/chain-status', icon: Link2, i18nKey: 'chainStatus' },
  { to: '/settings', icon: Settings, i18nKey: 'settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation('nav')

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 glass flex flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src="/octopus-logo.svg" alt="OctopusWallet" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Octopus</h1>
              <p className="text-xs text-muted-foreground">{t('auth:subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-primary glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {t(item.i18nKey)}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center">OctopusWallet v1.0</p>
        </div>
      </aside>
    </>
  )
}
