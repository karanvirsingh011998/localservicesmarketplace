# QuickFix UI Screen Inventory

Status key: **exists** = reachable polished UI · **partial** = UI with mock-only behavior

This build is **UI-only** (no Supabase / backend).

## Catalog

- **28** parent categories + **201** subcategories in `src/mocks/categories.ts`
- **15** featured Home quick-access tiles
- Representative priced services for browse/book demos

## Foundation / Auth / Roles

All entry, auth, and role-tab screens exist and were polished in the UI polish pass (safe areas, sticky CTAs where needed, a11y, tokens).

## Guest / Customer / Provider

All planned routes remain reachable. Provider ops stubs were replaced with finished mock UIs (availability, analytics, transactions, calendar, portfolio, documents, reviews, notifications, settings, profile edit/view).

## Design system

Semantic tokens for spacing, sizes, motion, brand-aware accents, dark shadows, reduced motion. Shared compositions: Card, ServiceCard, OfferCard, ListRow, ThreadRow, StatusTimeline, RoleTabs.
