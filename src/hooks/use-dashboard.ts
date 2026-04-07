import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { DashboardStats, VolumePoint, ChainDistribution, RecentActivity } from '@/types'

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => (await api.get('/dashboard/stats')).data,
  })
}

export function useVolumeChart(days = 7) {
  return useQuery<VolumePoint[]>({
    queryKey: ['dashboard', 'volume', days],
    queryFn: async () => (await api.get(`/dashboard/volume-chart?days=${days}`)).data,
  })
}

export function useChainDistribution() {
  return useQuery<ChainDistribution[]>({
    queryKey: ['dashboard', 'chain-distribution'],
    queryFn: async () => (await api.get('/dashboard/chain-distribution')).data,
  })
}

export function useRecentActivity(limit = 10) {
  return useQuery<RecentActivity[]>({
    queryKey: ['dashboard', 'recent-activity', limit],
    queryFn: async () => (await api.get(`/dashboard/recent-activity?limit=${limit}`)).data,
  })
}
