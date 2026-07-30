import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Appearance, BrandTheme } from '@/theme/tokens';

export type AppRole = 'guest' | 'customer' | 'provider';

export type BookingDraft = {
  serviceId?: string;
  providerId?: string;
  date?: string;
  time?: string;
  addressId?: string;
  notes?: string;
  images: string[];
};

type AppState = {
  hydrated: boolean;
  hasOnboarded: boolean;
  role: AppRole;
  isAuthenticated: boolean;
  appearance: Appearance;
  brand: BrandTheme;
  locationLabel: string;
  bookingDraft: BookingDraft;
  setHydrated: (v: boolean) => void;
  completeOnboarding: () => void;
  setRole: (role: AppRole) => void;
  setAuthenticated: (v: boolean) => void;
  setAppearance: (appearance: Appearance) => void;
  setBrand: (brand: BrandTheme) => void;
  setLocationLabel: (label: string) => void;
  patchBookingDraft: (patch: Partial<BookingDraft>) => void;
  resetBookingDraft: () => void;
  signOut: () => void;
};

const emptyDraft: BookingDraft = { images: [] };

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hydrated: false,
      hasOnboarded: false,
      role: 'guest',
      isAuthenticated: false,
      appearance: 'system',
      brand: 'royalBlue',
      locationLabel: 'Koramangala, Bengaluru',
      bookingDraft: emptyDraft,
      setHydrated: (hydrated) => set({ hydrated }),
      completeOnboarding: () => set({ hasOnboarded: true }),
      setRole: (role) => set({ role }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setAppearance: (appearance) => set({ appearance }),
      setBrand: (brand) => set({ brand }),
      setLocationLabel: (locationLabel) => set({ locationLabel }),
      patchBookingDraft: (patch) =>
        set((s) => ({ bookingDraft: { ...s.bookingDraft, ...patch } })),
      resetBookingDraft: () => set({ bookingDraft: emptyDraft }),
      signOut: () =>
        set({
          isAuthenticated: false,
          role: 'guest',
          bookingDraft: emptyDraft,
        }),
    }),
    {
      name: 'quickfix-ui',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        hasOnboarded: s.hasOnboarded,
        role: s.role,
        isAuthenticated: s.isAuthenticated,
        appearance: s.appearance,
        brand: s.brand,
        locationLabel: s.locationLabel,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// Safety: never block splash forever if persist fails
setTimeout(() => {
  if (!useAppStore.getState().hydrated) {
    useAppStore.getState().setHydrated(true);
  }
}, 1500);
