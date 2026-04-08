# OctopusWallet Admin

<p align="center">
  <img src="public/octopus-logo.svg" alt="OctopusWallet" width="100" />
</p>

<p align="center">
  <strong>A modern, open-source admin dashboard for <a href="https://github.com/gopvra/OctopusWallet">OctopusWallet</a></strong><br/>
  Multi-chain cryptocurrency payment gateway management
</p>

<p align="center">
  <img src="docs/dashboard-preview.svg" alt="Dashboard Preview" width="100%" />
</p>

## Features

- **Dashboard** — Real-time statistics, payment volume charts, chain distribution, recent activity
- **Merchant Management** — List, search, activate/deactivate merchants
- **Payment Monitoring** — Filter by status, chain, merchant with full detail views
- **Payout Tracking** — Monitor outgoing payouts with status tracking
- **Refund Management** — Track refund requests and their processing status
- **Batch Payouts** — View batch payout operations with per-item detail
- **Wallet Overview** — Browse all HD-derived wallet addresses
- **Balance Ledger** — Monitor merchant available/pending balances per chain
- **Supported Currencies** — View all configured currencies and tokens
- **Chain Status** — Monitor blockchain sync state per chain
- **Admin Users** — Manage admin accounts with role-based access (super_admin)
- **Dark Sci-Fi Theme** — Professional dark UI with glassmorphism effects
- **i18n / Multi-language** — 5 languages (English, 中文, 日本語, 한국어, Español) via react-i18next with 9 namespaces, localStorage persistence, and automatic `Accept-Language` header on API calls
- **Role-Based Access Control (RBAC)** — 3 roles: `super_admin` (full access), `admin` (read-only), `viewer` (dashboard-only)
- **Toast Notifications** — Non-blocking feedback via Sonner
- **404 Not Found Page** — Friendly fallback for unmatched routes
- **Mobile Responsive Sidebar** — Hamburger menu with backdrop overlay for small screens
- **Global ErrorBoundary** — Catches unhandled React errors with a recovery UI
- **Password Visibility Toggle** — Show/hide password on the login page
- **Delete Confirmation Dialogs** — Prevents accidental destructive actions
- **WebAuthn / Passkey Login** — Fingerprint, Face ID, Windows Hello, security key authentication

## Architecture

<p align="center">
  <img src="docs/architecture.svg" alt="Architecture" width="100%" />
</p>

The admin system consists of two parts:

| Component | Repository | Tech Stack |
|-----------|-----------|------------|
| **Admin API** | [OctopusWallet](https://github.com/gopvra/OctopusWallet) | Go + Gin + JWT + GORM + PostgreSQL + Redis |
| **Admin Frontend** | This repo | React 18 + TypeScript + Vite + Tailwind CSS + react-i18next |

Both connect to the same PostgreSQL database. The admin API runs alongside the main OctopusWallet server. Redis is used for rate limiting and idempotency caching.

## Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Data Fetching | TanStack Query |
| Tables | TanStack Table |
| Charts | Recharts |
| Routing | React Router v7 |
| State | Zustand |
| Internationalization | i18next + react-i18next |
| Notifications | Sonner |
| Icons | Lucide React |
| HTTP Client | Axios |

### Backend (Admin API in OctopusWallet)

| Layer | Technology |
|-------|-----------|
| ORM | GORM |
| Cache | Redis (rate limiting, idempotency) |
| Auth | JWT (access + refresh tokens) |
| Response Format | Unified JSON with error codes |

## Quick Start

### Prerequisites

- Node.js 18+
- OctopusWallet backend running (with admin API enabled)
- PostgreSQL with migrations applied

### Installation

```bash
git clone https://github.com/gopvra/OctopusWallet-Admin.git
cd OctopusWallet-Admin
npm install
```

### Development

```bash
npm run dev
```

The dev server starts at `http://localhost:5173` and proxies `/api` requests to `http://localhost:8080` (OctopusWallet backend).

### Build

```bash
npm run build
```

Output goes to `dist/` — serve with any static file server.

### Default Login

On first startup, OctopusWallet creates a default admin account:

```
Username: admin
Password: changeme
```

> **Important:** Change the default password immediately after first login.

## Backend Configuration

Add to your OctopusWallet `config.yaml`:

```yaml
admin:
  jwt_secret: "your-secure-random-secret-here"  # Required: change this!
  default_user: "admin"
  default_pass: "changeme"
  allowed_origins:
    - "http://localhost:5173"    # Vite dev server
    - "https://admin.yourdomain.com"
```

Or via environment variables:

```bash
export OCTOPUS_ADMIN_JWT_SECRET="your-secure-random-secret-here"
export OCTOPUS_ADMIN_DEFAULT_USER="admin"
export OCTOPUS_ADMIN_DEFAULT_PASS="your-strong-password"
```

## Admin API Endpoints

All endpoints are under `/api/admin/v1`.

### Unified Response Format

All API responses follow a consistent envelope:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

Non-zero `code` values indicate errors. Each error code maps to a specific failure reason (e.g., `1001` for invalid credentials, `1002` for insufficient permissions). The frontend maps these codes to localized error messages via i18n.

### Authentication
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Login with username/password |
| POST | `/auth/refresh` | Refresh JWT token |
| GET | `/auth/me` | Get current admin user |
| POST | `/auth/webauthn/login/begin` | Start passkey authentication |
| POST | `/auth/webauthn/login/finish` | Complete passkey login (returns JWT) |
| POST | `/auth/webauthn/register/begin` | Start passkey registration (authenticated) |
| POST | `/auth/webauthn/register/finish` | Complete passkey registration |
| GET | `/auth/webauthn/credentials` | List registered passkeys |
| DELETE | `/auth/webauthn/credentials/:id` | Remove a passkey |

### Dashboard
| Method | Path | Description |
|--------|------|-------------|
| GET | `/dashboard/stats` | Aggregate statistics |
| GET | `/dashboard/volume-chart` | Payment volume over time |
| GET | `/dashboard/chain-distribution` | Volume by chain |
| GET | `/dashboard/recent-activity` | Recent payments and payouts |

### Resources
| Method | Path | Description |
|--------|------|-------------|
| GET | `/merchants` | List merchants (paginated, searchable) |
| GET | `/merchants/:id` | Merchant detail |
| PUT | `/merchants/:id` | Update merchant |
| PATCH | `/merchants/:id/toggle-active` | Toggle merchant active status |
| GET | `/payments` | List payments (filterable) |
| GET | `/payments/:id` | Payment detail |
| GET | `/payouts` | List payouts (filterable) |
| GET | `/payouts/:id` | Payout detail |
| GET | `/refunds` | List refunds (filterable) |
| GET | `/refunds/:id` | Refund detail |
| GET | `/batch-payouts` | List batch payouts |
| GET | `/batch-payouts/:id` | Batch payout detail with items |
| GET | `/wallets` | List wallets (filterable) |
| GET | `/balances` | Merchant balances |
| GET | `/currencies` | Supported currencies |
| GET | `/chain-state` | Chain sync status |

### Admin Users (super_admin only)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin-users` | List admin users |
| POST | `/admin-users` | Create admin user |
| PUT | `/admin-users/:id` | Update admin user |
| DELETE | `/admin-users/:id` | Delete admin user |

> **Permission-based protection:** All resource endpoints enforce RBAC. `viewer` accounts can only access dashboard endpoints. `admin` accounts have read-only access to all resources. `super_admin` accounts have full read/write access including admin user management. Unauthorized requests receive a `1002` error code.

## Project Structure

```
src/
├── api/client.ts              # Axios instance with JWT interceptor, 15s timeout, Accept-Language header
├── App.tsx                    # Routes + QueryClient + ErrorBoundary
├── index.css                  # Tailwind + dark theme CSS variables
├── stores/auth-store.ts       # Zustand auth state with JWT expiry checking
├── i18n/                      # Internationalization
│   ├── index.ts               # i18next configuration (5 languages, localStorage persistence)
│   └── locales/
│       ├── en/                # English (9 namespace JSON files)
│       ├── zh/                # 中文
│       ├── ja/                # 日本語
│       ├── ko/                # 한국어
│       └── es/                # Español
├── hooks/                     # TanStack Query hooks
│   ├── use-dashboard.ts
│   ├── use-merchants.ts
│   ├── use-payments.ts
│   ├── use-payouts.ts
│   ├── use-refunds.ts
│   ├── use-batch-payouts.ts
│   └── use-wallets.ts
├── components/
│   ├── layout/                # Sidebar (mobile responsive w/ hamburger + backdrop), header, app layout
│   ├── error-boundary.tsx     # Global error boundary with recovery UI
│   ├── delete-dialog.tsx      # Reusable delete confirmation dialog
│   ├── data-table.tsx         # Reusable paginated table
│   ├── stat-card.tsx          # Dashboard stat card
│   ├── status-badge.tsx       # Status indicator
│   ├── chain-icon.tsx         # Chain badge/icon
│   └── address-display.tsx    # Address with copy button
├── pages/
│   ├── login.tsx              # Login with password visibility toggle
│   ├── dashboard.tsx
│   ├── merchants/             # list + detail
│   ├── payments/              # list + detail
│   ├── payouts/               # list + detail
│   ├── refunds/               # list + detail
│   ├── batch-payouts/         # list + detail
│   ├── wallets.tsx
│   ├── balances.tsx
│   ├── currencies.tsx
│   ├── chain-status.tsx
│   ├── settings.tsx
│   └── not-found.tsx          # 404 page
└── types/index.ts             # TypeScript interfaces
```

## Login Page

<p align="center">
  <img src="docs/login-preview.svg" alt="Login Preview" width="600" />
</p>

## Security

### Authentication & Authorization
- JWT authentication with access/refresh token pair
- Client-side JWT expiry checking (token decoded to detect expiration before requests)
- Token cleanup on authentication failure (expired, revoked, or invalid tokens are cleared automatically)
- Refresh tokens validated with issuer check
- Deactivated user token refresh rejection
- WebAuthn / FIDO2 passkey authentication (fingerprint, Face ID, security keys)
- Role-based access control (RBAC) with 3 roles: `super_admin`, `admin`, `viewer`
- Permission-based endpoint protection on all resource routes
- Admin self-deletion prevention

### Rate Limiting & Network
- Login rate limiting (5 requests/minute, backed by Redis)
- Redis-backed idempotency keys to prevent duplicate mutations
- 15-second timeout on all API requests
- WebSocket auto-reconnect with exponential backoff for real-time updates

### Server-Side Protections
- Timing-attack resistant login (constant-time password comparison)
- UUID validation on all ID parameters
- Security headers (X-Frame-Options, X-Content-Type-Options, CSP)
- CORS with explicit origin whitelist
- Content Security Policy meta tag
- GORM ORM (parameterized queries, no raw SQL injection surface)

## License

MIT
