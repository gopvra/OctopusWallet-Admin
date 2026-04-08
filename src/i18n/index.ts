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

import jaCommon from './locales/ja/common.json'
import jaNav from './locales/ja/nav.json'
import jaAuth from './locales/ja/auth.json'
import jaDashboard from './locales/ja/dashboard.json'
import jaMerchants from './locales/ja/merchants.json'
import jaPayments from './locales/ja/payments.json'
import jaPayouts from './locales/ja/payouts.json'
import jaRefunds from './locales/ja/refunds.json'
import jaSettings from './locales/ja/settings.json'

import koCommon from './locales/ko/common.json'
import koNav from './locales/ko/nav.json'
import koAuth from './locales/ko/auth.json'
import koDashboard from './locales/ko/dashboard.json'
import koMerchants from './locales/ko/merchants.json'
import koPayments from './locales/ko/payments.json'
import koPayouts from './locales/ko/payouts.json'
import koRefunds from './locales/ko/refunds.json'
import koSettings from './locales/ko/settings.json'

import esCommon from './locales/es/common.json'
import esNav from './locales/es/nav.json'
import esAuth from './locales/es/auth.json'
import esDashboard from './locales/es/dashboard.json'
import esMerchants from './locales/es/merchants.json'
import esPayments from './locales/es/payments.json'
import esPayouts from './locales/es/payouts.json'
import esRefunds from './locales/es/refunds.json'
import esSettings from './locales/es/settings.json'

const ns = ['common', 'nav', 'auth', 'dashboard', 'merchants', 'payments', 'payouts', 'refunds', 'settings']

const savedLang = localStorage.getItem('lang') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, nav: enNav, auth: enAuth, dashboard: enDashboard, merchants: enMerchants, payments: enPayments, payouts: enPayouts, refunds: enRefunds, settings: enSettings },
    zh: { common: zhCommon, nav: zhNav, auth: zhAuth, dashboard: zhDashboard, merchants: zhMerchants, payments: zhPayments, payouts: zhPayouts, refunds: zhRefunds, settings: zhSettings },
    ja: { common: jaCommon, nav: jaNav, auth: jaAuth, dashboard: jaDashboard, merchants: jaMerchants, payments: jaPayments, payouts: jaPayouts, refunds: jaRefunds, settings: jaSettings },
    ko: { common: koCommon, nav: koNav, auth: koAuth, dashboard: koDashboard, merchants: koMerchants, payments: koPayments, payouts: koPayouts, refunds: koRefunds, settings: koSettings },
    es: { common: esCommon, nav: esNav, auth: esAuth, dashboard: esDashboard, merchants: esMerchants, payments: esPayments, payouts: esPayouts, refunds: esRefunds, settings: esSettings },
  },
  lng: savedLang,
  fallbackLng: 'en',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng)
})

export default i18n
