# QuickFix — UI-only Expo app

Local services marketplace UI. All screens use **mock data** — no backend.

## Run

```bash
nvm use 22   # Node 20+ required
npm install --legacy-peer-deps
npm start
```

Then press `i` (iOS), `a` (Android), or `w` (web).

## Structure

- `app/` — Expo Router screens (guest / customer / provider role tabs)
- `src/theme/` — design tokens (colors, spacing, radius, shadows, typography)
- `src/components/` — reusable UI primitives
- `src/mocks/` — fake marketplace data
- `src/store/` — role, onboarding, booking draft (Zustand + AsyncStorage)

## Roles & tabs

| Role | Tabs |
|------|------|
| Guest | Home, Search, Categories, Map, Profile |
| Customer | Home, Discover, Bookings, Messages, Profile |
| Provider | Dashboard, Jobs, Messages, Earnings, Profile |

Use **Select Role** (or Profile → Switch role) to preview each experience.
