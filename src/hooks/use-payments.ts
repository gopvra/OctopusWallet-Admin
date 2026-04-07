import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { Payment, PaginatedResult } from '@/types'

export function usePayments(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<Payment>>({
    queryKey: ['payments', params],
    queryFn: async () => (await api.get('/payments', { params })).data,
  })
}

export function usePayment(id: string) {
  return useQuery<Payment>({
    queryKey: ['payments', id],
    queryFn: async () => (await api.get(`/payments/${id}`)).data,
    enabled: !!id,
  })
}
