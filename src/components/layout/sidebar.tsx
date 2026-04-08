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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
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
