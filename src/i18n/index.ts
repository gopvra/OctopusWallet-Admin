import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enNav from './locales/en/nav.json'
import enAuth from './locales/en/auth.json'
import enDashboard from './locales/en/dashboard.json'
import enMerchants from './locales/en/merchants.json'
import enPayments from './locales/en/payments.json'
import enPayouts from './locales/en/payouts.json'
import enRefunds from './locales/en/refunds.json'
import enSettings from './locales/en/settings.json'

import zhCommon from './locales/zh/common.json'
import zhNav from './locales/zh/nav.json'
import zhAuth from './locales/zh/auth.json'
import zhDashboard from './locales/zh/dashboard.json'
import zhMerchants from './locales/zh/merchants.json'
import zhPayments from './locales/zh/payments.json'
import zhPayouts from './locales/zh/payouts.json'
import zhRefunds from './locales/zh/refunds.json'
import zhSettings from './locales/zh/settings.json'

const savedLang = localStorage.getItem('lang') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      nav: enNav,
      auth: enAuth,
      dashboard: enDashboard,
      merchants: enMerchants,
      payments: enPayments,
      payouts: enPayouts,
      refunds: enRefunds,
      settings: enSettings,
    },
    zh: {
      common: zhCommon,
      nav: zhNav,
      auth: zhAuth,
      dashboard: zhDashboard,
      merchants: zhMerchants,
      payments: zhPayments,
      payouts: zhPayouts,
      refunds: zhRefunds,
      settings: zhSettings,
    },
  },
  lng: savedLang,
  fallbackLng: 'en',
  ns: ['common', 'nav', 'auth', 'dashboard', 'merchants', 'payments', 'payouts', 'refunds', 'settings'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false, // React already escapes
  },
})

// Persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng)
})

export default i18n
