import { useAuth } from '@/hooks/use-auth'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/language-switcher'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 h-16 glass flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || 'admin'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
