import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { Refund, PaginatedResult } from '@/types'

export function useRefunds(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<Refund>>({
    queryKey: ['refunds', params],
    queryFn: async () => (await api.get('/refunds', { params })).data,
  })
}

export function useRefund(id: string) {
  return useQuery<Refund>({
    queryKey: ['refunds', id],
    queryFn: async () => (await api.get(`/refunds/${id}`)).data,
    enabled: !!id,
  })
}
