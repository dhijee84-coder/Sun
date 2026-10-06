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

## Database (temporary SQLite → later live Postgres)

**Now:** file **`sqlite.db`**. Login, panels, tickets, CMS and sessions all live there. No Neon required.

**Later:** set `DATABASE_URL` to Neon/Postgres. Same app — it switches automatically.

| Environment | File |
|---|---|
| Local / this preview | `sqlite.db` in the project (survives restart) |
| Vercel (no `DATABASE_URL`) | `/tmp/solan.sqlite` (created and seeded on first request) |
| Vercel with Neon | `DATABASE_URL` — live shared DB |

Health: `GET /api/health` → `"db":"sqlite"` or `"db":"neon"`.

## Local / preview

```
npm install
npm run dev
```

Opens on `http://localhost:8080`. First page load seeds demo users into `sqlite.db`.

## Vercel (SQLite now, Neon later)

Minimum for demo login (SQLite):

| Name | Value |
|---|---|
| `BETTER_AUTH_SECRET` | long random string (keep it stable) |
| `BETTER_AUTH_URL` | `https://YOUR-APP.vercel.app` (no trailing slash) |
| `VITE_AUTH_ENABLED` | `true` |

Do **not** set `DATABASE_URL` until you have Neon. The app will use SQLite.

When you are ready for a live shared database:

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon pooled string (`sslmode=require`) |

Redeploy after saving env vars.

## Tests

```
npm test
npm run typecheck
npm run build
```

## Theme

Day / night mode is stored as `solan-theme` in localStorage (`light` | `dark`). Brand tokens: gold `#f9c80e`, ember `#f97316`, leaf `#22c55e`, sky `#38bdf8`.
