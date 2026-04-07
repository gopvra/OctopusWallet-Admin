import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { BatchPayout, BatchPayoutItem, PaginatedResult, MerchantBalance, SupportedCurrency } from '@/types'

export function useBatchPayouts(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<BatchPayout>>({
    queryKey: ['batch-payouts', params],
    queryFn: async () => (await api.get('/batch-payouts', { params })).data,
  })
}

export function useBatchPayout(id: string) {
  return useQuery<{ batch: BatchPayout; items: BatchPayoutItem[] }>({
    queryKey: ['batch-payouts', id],
    queryFn: async () => (await api.get(`/batch-payouts/${id}`)).data,
    enabled: !!id,
  })
}

export function useMerchantBalances(params?: Record<string, string>) {
  return useQuery<MerchantBalance[]>({
    queryKey: ['balances', params],
    queryFn: async () => (await api.get('/balances', { params })).data,
  })
}

export function useSupportedCurrencies() {
  return useQuery<SupportedCurrency[]>({
    queryKey: ['currencies'],
    queryFn: async () => (await api.get('/currencies')).data,
  })
}
