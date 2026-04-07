import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { Payout, PaginatedResult } from '@/types'

export function usePayouts(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<Payout>>({
    queryKey: ['payouts', params],
    queryFn: async () => (await api.get('/payouts', { params })).data,
  })
}

export function usePayout(id: string) {
  return useQuery<Payout>({
    queryKey: ['payouts', id],
    queryFn: async () => (await api.get(`/payouts/${id}`)).data,
    enabled: !!id,
  })
}
