# QuickFix UI Screen Inventory

Status key: **exists** = reachable route with UI · **partial** = UI with mock-only behavior

This build is **UI-only** (no Supabase / backend).

## Foundation

| Screen | Path | Status |
|--------|------|--------|
| Splash / entry | `app/index.tsx` | exists |
| Onboarding | `app/onboarding.tsx` | exists |
| Welcome | `app/welcome.tsx` | exists |
| Select Role | `app/select-role.tsx` | exists |

## Guest tabs

| Screen | Path | Status |
|--------|------|--------|
| Home | `app/(guest)/index.tsx` | exists |
| Search | `app/(guest)/search.tsx` | exists |
| Categories | `app/(guest)/categories.tsx` | exists |
| Map | `app/(guest)/map.tsx` | exists (mock map) |
| Profile | `app/(guest)/profile.tsx` | exists |

## Customer tabs

| Screen | Path | Status |
|--------|------|--------|
| Home | `app/(customer)/index.tsx` | exists |
| Discover | `app/(customer)/discover.tsx` | exists |
| Bookings | `app/(customer)/bookings.tsx` | exists |
| Messages | `app/(customer)/messages.tsx` | exists |
| Profile | `app/(customer)/profile.tsx` | exists |

## Provider tabs

| Screen | Path | Status |
|--------|------|--------|
| Dashboard | `app/(provider)/index.tsx` | exists |
| Jobs | `app/(provider)/jobs.tsx` | exists |
| Messages | `app/(provider)/messages.tsx` | exists |
| Earnings | `app/(provider)/earnings.tsx` | exists |
| Profile | `app/(provider)/profile.tsx` | exists |

## Auth

| Screen | Path | Status |
|--------|------|--------|
| Login | `app/auth/login.tsx` | exists |
| Register | `app/auth/register.tsx` | exists |
| OTP | `app/auth/otp.tsx` | exists (mock) |
| Forgot password | `app/auth/forgot-password.tsx` | exists (mock) |
| Reset password | `app/auth/reset-password.tsx` | exists (mock) |

## Discovery

| Screen | Path | Status |
|--------|------|--------|
| Search results | `app/search/results.tsx` | exists |
| Category / subcategories | `app/category/[id].tsx` | exists |
| Service listing | `app/service/index.tsx` | exists |
| Service details | `app/service/[id].tsx` | exists |
| Provider listing | `app/providers/index.tsx` | exists |
| Provider profile | `app/providers/[id].tsx` | exists |
| Provider gallery | `app/providers/gallery.tsx` | exists |
| Reviews | `app/providers/reviews.tsx` | exists |
| Offers | `app/offers/index.tsx` | exists |

## Booking

| Screen | Path | Status |
|--------|------|--------|
| Select date | `app/booking/date.tsx` | exists |
| Select time | `app/booking/time.tsx` | exists |
| Select address | `app/booking/address.tsx` | exists |
| Add address | `app/booking/add-address.tsx` | exists |
| Summary | `app/booking/summary.tsx` | exists |
| Payment (mock) | `app/booking/payment.tsx` | exists |
| Confirmation | `app/booking/confirmation.tsx` | exists |
| Success | `app/booking/success.tsx` | exists |
| Booking details | `app/booking/[id].tsx` | exists |
| Active booking | `app/booking/active.tsx` | exists |
| Timeline | `app/booking/timeline.tsx` | exists |
| History | `app/booking/history.tsx` | exists |
| Reschedule | `app/booking/reschedule.tsx` | exists |
| Cancel | `app/booking/cancel.tsx` | exists |

## Customer account

| Screen | Path | Status |
|--------|------|--------|
| Notifications | `app/notifications.tsx` | exists |
| Favorites | `app/favorites.tsx` | exists |
| Saved addresses | `app/addresses.tsx` | exists |
| Coupons | `app/coupons.tsx` | exists |
| Rewards | `app/rewards.tsx` | exists |
| Refer & earn | `app/refer.tsx` | exists |
| Edit profile | `app/profile/edit.tsx` | exists |
| Settings | `app/profile/settings.tsx` | exists |
| Chat thread | `app/chat/[id].tsx` | exists |

## Provider ops

| Screen | Path | Status |
|--------|------|--------|
| New requests | `app/provider/requests.tsx` | exists |
| Job details | `app/provider/jobs/[id].tsx` | exists |
| Analytics | `app/provider/analytics.tsx` | exists |
| Transactions | `app/provider/transactions.tsx` | exists |
| My services | `app/provider/services/index.tsx` | exists |
| Add / Edit service | `app/provider/services/add.tsx`, `edit.tsx` | exists |
| Availability | `app/provider/availability.tsx` | exists |
| Calendar | `app/provider/calendar.tsx` | exists |
| Portfolio | `app/provider/portfolio.tsx` | exists |
| Documents | `app/provider/documents.tsx` | exists |
| Reviews | `app/provider/reviews.tsx` | exists |
| Profile / Edit | `app/provider/profile-view.tsx`, `edit-profile.tsx` | exists |
| Notifications / Settings | `app/provider/notifications.tsx`, `settings.tsx` | exists |

## Shared

| Screen | Path | Status |
|--------|------|--------|
| About / Privacy / Terms | `app/shared/*` | exists |
| Help / FAQ / Contact | `app/shared/*` | exists |
| Location picker | `app/shared/location-picker.tsx` | exists |
| Filters / Sort | `app/shared/filters.tsx`, `sort.tsx` | exists |
| Image / Gallery viewer | `app/shared/image-viewer.tsx`, `gallery-viewer.tsx` | exists |

**Missing count: 0**
