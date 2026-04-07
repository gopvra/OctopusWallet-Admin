import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '@/components/layout/app-layout'
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import MerchantListPage from '@/pages/merchants/list'
import MerchantDetailPage from '@/pages/merchants/detail'
import PaymentListPage from '@/pages/payments/list'
import PaymentDetailPage from '@/pages/payments/detail'
import PayoutListPage from '@/pages/payouts/list'
import PayoutDetailPage from '@/pages/payouts/detail'
import WalletsPage from '@/pages/wallets'
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
            <Route path="/wallets" element={<WalletsPage />} />
            <Route path="/chain-status" element={<ChainStatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
