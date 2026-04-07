import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/client'
import { useAuth } from '@/hooks/use-auth'
import type { AdminUser } from '@/types'
import { formatDate } from '@/lib/utils'
import { Shield, UserPlus, Trash2, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const isSuperAdmin = user?.role === 'super_admin'

  const { data: adminUsers } = useQuery<AdminUser[]>({
    queryKey: ['admin-users'],
    queryFn: async () => (await api.get('/admin-users')).data,
    enabled: isSuperAdmin,
  })

  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'admin' })
  const [creating, setCreating] = useState(false)

  const createUser = useMutation({
    mutationFn: async (data: typeof form) => api.post('/admin-users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
      setShowCreate(false)
      setForm({ username: '', email: '', password: '', role: 'admin' })
    },
  })

  const deleteUser = useMutation({
    mutationFn: async (id: string) => api.delete(`/admin-users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      await createUser.mutateAsync(form)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Current User Info */}
      <div className="rounded-xl border border-white/10 bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Your Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Username</span>
            <p className="font-medium">{user?.username}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Email</span>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Role</span>
            <p className="font-medium capitalize flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary" />
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Admin User Management (super_admin only) */}
      {isSuperAdmin && (
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Admin Users</h3>
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>

          {showCreate && (
            <form onSubmit={handleCreate} className="mb-6 p-4 rounded-lg bg-secondary/50 border border-white/10 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <input
                  type="password"
                  placeholder="Password (min 12 chars)"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  minLength={12}
                  maxLength={128}
                />
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-secondary border border-white/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">Username</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">Email</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">Role</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">Created</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers?.map((au) => (
                  <tr key={au.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-medium">{au.username}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{au.email}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        au.role === 'super_admin' ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {au.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground text-xs">{formatDate(au.created_at)}</td>
                    <td className="py-2.5 px-3">
                      {au.id !== user?.id && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete admin user "${au.username}"? This cannot be undone.`)) {
                              deleteUser.mutate(au.id)
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
