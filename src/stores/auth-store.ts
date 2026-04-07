import { create } from 'zustand'
import type { AdminUser } from '@/types'
import api from '@/api/client'

interface AuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),

  login: async (username: string, password: string) => {
    const res = await api.post('/auth/login', { username, password })
    localStorage.setItem('access_token', res.data.token.access_token)
    localStorage.setItem('refresh_token', res.data.token.refresh_token)
    set({ user: res.data.user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false })
  },

  fetchUser: async () => {
    try {
      const res = await api.get('/auth/me')
      set({ user: res.data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },
}))
