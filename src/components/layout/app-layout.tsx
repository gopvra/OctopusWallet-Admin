import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useEffect } from 'react'

export function AppLayout() {
  const { isAuthenticated, fetchUser } = useAuth()

  useEffect(() => {
    if (isAuthenticated) fetchUser()
  }, [isAuthenticated, fetchUser])

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
