# Solan

Farm-side solar platform. Clients buy panels at Solan parks on open land. Solan operates the plant and bills energy on usage. Nothing is installed on houses.

Single TypeScript stack (TanStack Start) — deploys linearly to Vercel.

## Product surfaces

- Public website: `/` `/about` `/solar` `/how-it-works` `/services` `/projects` `/faq` `/contact`
- Client portal: `/login` → `/client/dashboard`
- Staff portal: `/staff-login` → `/staff/dashboard` (Admin, Super Admin, Primary Admin)

## Demo accounts

Password for all email accounts: `SolanFarm2026!`

| Role | Sign-in |
|---|---|
| Client | `demo@solan.energy` / `SolanFarm2026!` **or** mobile `9999999999` / OTP `1234` |
| Admin | `admin@solan.energy` |
| Super Admin | `super@solan.energy` |
| Primary Admin | `primary@solan.energy` |

## Local / preview

```
npm install
npm run dev
```

Opens on `http://localhost:8080`. First page load seeds demo users, farms, and the 10-panel client.

Health: `GET /api/health`

Auth and database are injected by the platform (`VITE_AUTH_ENABLED`, `DATABASE_URL`). Do not add a `.env` file.

## Database

Postgres (Neon in production, PGLite in the sandbox preview). Schema lives in `migrations/`. Seeded on first request via `src/lib/solan/seed.ts`.

## Tests

```
npm test
npm run typecheck
npm run build
```

## Theme

Day / night mode is stored as `solan-theme` in localStorage (`light` | `dark`). Brand tokens: gold `#f9c80e`, ember `#f97316`, leaf `#22c55e`, sky `#38bdf8`.
