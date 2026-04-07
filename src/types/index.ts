export interface Merchant {
  id: string
  name: string
  email: string
  webhook_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  merchant_id: string
  chain: string
  token: string
  amount_expected: string
  amount_received: string
  address: string
  status: string
  tx_hash?: string
  confirmations: number
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface Payout {
  id: string
  merchant_id: string
  chain: string
  token: string
  to_address: string
  amount: string
  status: string
  tx_hash?: string
  error_message?: string
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  merchant_id: string
  chain: string
  address: string
  derivation_index: number
  created_at: string
}

export interface ChainState {
  chain: string
  last_scanned_block: number
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Meta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: Meta
}

export interface DashboardStats {
  total_merchants: number
  active_merchants: number
  total_payments: number
  total_payouts: number
  total_volume: string
  pending_payments: number
  pending_payouts: number
}

export interface VolumePoint {
  date: string
  count: number
  volume: string
}

export interface ChainDistribution {
  chain: string
  count: number
  volume: string
}

export interface RecentActivity {
  id: string
  type: string
  chain: string
  amount: string
  status: string
  created_at: string
}

export interface Refund {
  id: string
  payment_id: string
  merchant_id: string
  chain: string
  token: string
  to_address: string
  amount: string
  status: string
  tx_hash?: string
  reason: string
  error_message?: string
  created_at: string
  updated_at: string
}

export interface BatchPayout {
  id: string
  merchant_id: string
  chain: string
  token: string
  total_amount: string
  total_count: number
  completed_count: number
  failed_count: number
  status: string
  created_at: string
  updated_at: string
}

export interface BatchPayoutItem {
  id: string
  batch_id: string
  payout_id?: string
  to_address: string
  amount: string
  status: string
  error_message?: string
  created_at: string
}

export interface MerchantBalance {
  id: string
  merchant_id: string
  chain: string
  token: string
  available: string
  pending: string
  updated_at: string
}

export interface SupportedCurrency {
  id: string
  chain: string
  symbol: string
  name: string
  token_address: string
  decimals: number
  is_native: boolean
  is_active: boolean
  min_amount: string
  created_at: string
}

export interface TokenPair {
  access_token: string
  refresh_token: string
  expires_at: number
}

export interface LoginResponse {
  user: AdminUser
  token: TokenPair
}
