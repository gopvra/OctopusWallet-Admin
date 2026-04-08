import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AppLayout } from '@/components/layout/app-layout'
import LoginPage from '@/pages/login'
import NotFoundPage from '@/pages/not-found'
import DashboardPage from '@/pages/dashboard'
import MerchantListPage from '@/pages/merchants/list'
import MerchantDetailPage from '@/pages/merchants/detail'
import PaymentListPage from '@/pages/payments/list'
import PaymentDetailPage from '@/pages/payments/detail'
import PayoutListPage from '@/pages/payouts/list'
import PayoutDetailPage from '@/pages/payouts/detail'
import RefundListPage from '@/pages/refunds/list'
import RefundDetailPage from '@/pages/refunds/detail'
import BatchPayoutListPage from '@/pages/batch-payouts/list'
import BatchPayoutDetailPage from '@/pages/batch-payouts/detail'
import WalletsPage from '@/pages/wallets'
import BalancesPage from '@/pages/balances'
import CurrenciesPage from '@/pages/currencies'
import ChainStatusPage from '@/pages/chain-status'
import SettingsPage from '@/pages/settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: '#0f172a',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f8fafc',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/merchants" element={<MerchantListPage />} />
            <Route path="/merchants/:id" element={<MerchantDetailPage />} />
            <Route path="/payments" element={<PaymentListPage />} />
            <Route path="/payments/:id" element={<PaymentDetailPage />} />
            <Route path="/payouts" element={<PayoutListPage />} />
            <Route path="/payouts/:id" element={<PayoutDetailPage />} />
            <Route path="/refunds" element={<RefundListPage />} />
            <Route path="/refunds/:id" element={<RefundDetailPage />} />
            <Route path="/batch-payouts" element={<BatchPayoutListPage />} />
            <Route path="/batch-payouts/:id" element={<BatchPayoutDetailPage />} />
            <Route path="/wallets" element={<WalletsPage />} />
            <Route path="/balances" element={<BalancesPage />} />
            <Route path="/currencies" element={<CurrenciesPage />} />
            <Route path="/chain-status" element={<ChainStatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
