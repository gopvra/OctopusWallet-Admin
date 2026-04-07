import { useQuery } from '@tanstack/react-query'
import api from '@/api/client'
import type { Wallet, PaginatedResult, ChainState } from '@/types'

export function useWallets(params: Record<string, string | number>) {
  return useQuery<PaginatedResult<Wallet>>({
    queryKey: ['wallets', params],
    queryFn: async () => (await api.get('/wallets', { params })).data,
  })
}

export function useChainStates() {
  return useQuery<ChainState[]>({
    queryKey: ['chain-states'],
    queryFn: async () => (await api.get('/chain-state')).data,
  })
}
