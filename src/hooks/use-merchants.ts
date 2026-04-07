import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/api/client'
import type { Merchant, PaginatedResult } from '@/types'

export function useMerchants(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<Merchant>>({
    queryKey: ['merchants', params],
    queryFn: async () => (await api.get('/merchants', { params })).data,
  })
}

export function useMerchant(id: string) {
  return useQuery<Merchant>({
    queryKey: ['merchants', id],
    queryFn: async () => (await api.get(`/merchants/${id}`)).data,
    enabled: !!id,
  })
}

export function useToggleMerchant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => api.patch(`/merchants/${id}/toggle-active`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['merchants'] }),
  })
}

export function useUpdateMerchant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name: string; email: string; webhook_url: string }) =>
      api.put(`/merchants/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['merchants'] }),
  })
}
