import { useState } from 'react'
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'
import api from '@/api/client'
import type { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/browser'

export interface WebAuthnCredential {
  id: string
  display_name: string
  attestation_type: string
  transport: string
  created_at: string
}

export function useWebAuthnRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (displayName?: string) => {
    setLoading(true)
    setError(null)
    try {
      // Step 1: Get registration options from server
      const beginRes = await api.post('/auth/webauthn/register/begin')
      const options = beginRes.data.data as PublicKeyCredentialCreationOptionsJSON

      // Step 2: Create credential via browser WebAuthn API (triggers biometric prompt)
      const credential = await startRegistration({ optionsJSON: options })

      // Step 3: Send credential to server for verification
      const finishRes = await api.post('/auth/webauthn/register/finish', {
        ...credential,
        display_name: displayName || 'Passkey',
      })

      setLoading(false)
      return finishRes.data.data
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err?.message || 'Registration failed'
      setError(msg)
      setLoading(false)
      throw err
    }
  }

  return { register, loading, error }
}

export function useWebAuthnLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (username: string) => {
    setLoading(true)
    setError(null)
    try {
      // Step 1: Get authentication options
      const beginRes = await api.post('/auth/webauthn/login/begin', { username })
      const options = beginRes.data.data as PublicKeyCredentialRequestOptionsJSON

      // Step 2: Authenticate via browser WebAuthn API (triggers biometric prompt)
      const credential = await startAuthentication({ optionsJSON: options })

      // Step 3: Verify with server — returns JWT tokens
      const finishRes = await api.post(
        `/auth/webauthn/login/finish?username=${encodeURIComponent(username)}`,
        credential,
      )

      const { user, token } = finishRes.data.data
      localStorage.setItem('access_token', token.access_token)
      localStorage.setItem('refresh_token', token.refresh_token)

      setLoading(false)
      return { user, token }
    } catch (err: any) {
      const msg = err?.response?.data?.msg || err?.message || 'Authentication failed'
      setError(msg)
      setLoading(false)
      throw err
    }
  }

  return { login, loading, error }
}

export function useWebAuthnCredentials() {
  const [credentials, setCredentials] = useState<WebAuthnCredential[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCredentials = async () => {
    setLoading(true)
    try {
      const res = await api.get('/auth/webauthn/credentials')
      setCredentials(res.data.data || [])
    } catch {
      setCredentials([])
    }
    setLoading(false)
  }

  const deleteCredential = async (id: string) => {
    await api.delete(`/auth/webauthn/credentials/${id}`)
    setCredentials((prev) => prev.filter((c) => c.id !== id))
  }

  return { credentials, loading, fetchCredentials, deleteCredential }
}
