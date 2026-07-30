export type BrandTheme =
  | 'royalBlue'
  | 'emerald'
  | 'amber'
  | 'purple'
  | 'teal'
  | 'rose';

export type Appearance = 'light' | 'dark' | 'system';

const brandPrimaries: Record<BrandTheme, string> = {
  royalBlue: '#1B4DFF',
  emerald: '#059669',
  amber: '#D97706',
  purple: '#7C3AED',
  teal: '#0D9488',
  rose: '#E11D48',
};

const brandAccentsLight: Record<BrandTheme, { accent: string; accentForeground: string }> = {
  royalBlue: { accent: '#E8EEFF', accentForeground: '#1E3A8A' },
  emerald: { accent: '#D1FAE5', accentForeground: '#065F46' },
  amber: { accent: '#FEF3C7', accentForeground: '#92400E' },
  purple: { accent: '#EDE9FE', accentForeground: '#5B21B6' },
  teal: { accent: '#CCFBF1', accentForeground: '#115E59' },
  rose: { accent: '#FFE4E6', accentForeground: '#9F1239' },
};

const brandAccentsDark: Record<BrandTheme, { accent: string; accentForeground: string }> = {
  royalBlue: { accent: '#1E3A6E', accentForeground: '#BFDBFE' },
  emerald: { accent: '#064E3B', accentForeground: '#A7F3D0' },
  amber: { accent: '#78350F', accentForeground: '#FDE68A' },
  purple: { accent: '#4C1D95', accentForeground: '#DDD6FE' },
  teal: { accent: '#134E4A', accentForeground: '#99F6E4' },
  rose: { accent: '#881337', accentForeground: '#FECDD3' },
};

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  pill: 999,
} as const;

export const sizes = {
  touch: 44,
  control: 48,
  controlSm: 40,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 28,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  avatarXl: 72,
  fab: 56,
} as const;

export const motion = {
  pressScale: 0.97,
  cardPressScale: 0.98,
  spring: { damping: 18, stiffness: 220 },
  buttonMs: 130,
  cardMs: 300,
  screenMs: 300,
  modalMs: 300,
  bottomSheetMs: 380,
  successMs: 700,
  toastMs: 2400,
  listEnterDelay: 40,
} as const;

export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${clean}${a}`;
}

function buildShadows(mode: 'light' | 'dark') {
  const shadowColor = mode === 'dark' ? '#000000' : '#0F172A';
  return {
    none: {
      shadowColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    small: {
      shadowColor,
      shadowOpacity: mode === 'dark' ? 0.35 : 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    medium: {
      shadowColor,
      shadowOpacity: mode === 'dark' ? 0.4 : 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    large: {
      shadowColor,
      shadowOpacity: mode === 'dark' ? 0.45 : 0.16,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
    floating: {
      shadowColor,
      shadowOpacity: mode === 'dark' ? 0.5 : 0.2,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 12,
    },
  } as const;
}

export const typography = {
  display: { fontFamily: 'Fraunces_600SemiBold', fontSize: 36, lineHeight: 44 },
  h1: { fontFamily: 'Fraunces_600SemiBold', fontSize: 32, lineHeight: 40 },
  h2: { fontFamily: 'Fraunces_600SemiBold', fontSize: 28, lineHeight: 36 },
  h3: { fontFamily: 'DMSans_700Bold', fontSize: 24, lineHeight: 32 },
  h4: { fontFamily: 'DMSans_700Bold', fontSize: 20, lineHeight: 28 },
  title: { fontFamily: 'DMSans_700Bold', fontSize: 18, lineHeight: 24 },
  subtitle: { fontFamily: 'DMSans_500Medium', fontSize: 16, lineHeight: 22 },
  body: { fontFamily: 'DMSans_400Regular', fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: 'DMSans_400Regular', fontSize: 13, lineHeight: 18 },
  button: { fontFamily: 'DMSans_700Bold', fontSize: 16, lineHeight: 20 },
} as const;

type Palette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  overlay: string;
};

function buildPalette(mode: 'light' | 'dark', brand: BrandTheme): Palette {
  const primary = brandPrimaries[brand];
  const accents = mode === 'dark' ? brandAccentsDark[brand] : brandAccentsLight[brand];
  if (mode === 'dark') {
    return {
      background: '#0B1220',
      foreground: '#F8FAFC',
      card: '#151E2E',
      cardForeground: '#F8FAFC',
      muted: '#1E293B',
      mutedForeground: '#94A3B8',
      border: '#243044',
      primary,
      primaryForeground: '#FFFFFF',
      secondary: '#1E293B',
      secondaryForeground: '#F8FAFC',
      accent: accents.accent,
      accentForeground: accents.accentForeground,
      destructive: '#F43F5E',
      destructiveForeground: '#FFFFFF',
      success: '#22C55E',
      successForeground: '#052E16',
      warning: '#F59E0B',
      warningForeground: '#451A03',
      overlay: 'rgba(2,6,23,0.64)',
    };
  }
  return {
    background: '#F5F7FB',
    foreground: '#0F172A',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    muted: '#EEF2F7',
    mutedForeground: '#64748B',
    border: '#E2E8F0',
    primary,
    primaryForeground: '#FFFFFF',
    secondary: '#EEF2F7',
    secondaryForeground: '#0F172A',
    accent: accents.accent,
    accentForeground: accents.accentForeground,
    destructive: '#E11D48',
    destructiveForeground: '#FFFFFF',
    success: '#16A34A',
    successForeground: '#FFFFFF',
    warning: '#D97706',
    warningForeground: '#FFFFFF',
    overlay: 'rgba(15,23,42,0.45)',
  };
}

export type Theme = {
  appearance: Appearance;
  resolved: 'light' | 'dark';
  brand: BrandTheme;
  colors: Palette;
  spacing: typeof spacing;
  radius: typeof radius;
  sizes: typeof sizes;
  motion: typeof motion;
  shadows: ReturnType<typeof buildShadows>;
  typography: typeof typography;
  reduceMotion: boolean;
};

export function createTheme(
  appearance: Appearance,
  brand: BrandTheme,
  systemDark: boolean,
  reduceMotion = false,
): Theme {
  const resolved = appearance === 'system' ? (systemDark ? 'dark' : 'light') : appearance;
  return {
    appearance,
    resolved,
    brand,
    colors: buildPalette(resolved, brand),
    spacing,
    radius,
    sizes,
    motion,
    shadows: buildShadows(resolved),
    typography,
    reduceMotion,
  };
}
