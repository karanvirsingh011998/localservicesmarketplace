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

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  small: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  large: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
} as const;

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
  warning: string;
  overlay: string;
};

function buildPalette(mode: 'light' | 'dark', brand: BrandTheme): Palette {
  const primary = brandPrimaries[brand];
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
      accent: '#243B6B',
      accentForeground: '#E2E8F0',
      destructive: '#F43F5E',
      destructiveForeground: '#FFFFFF',
      success: '#22C55E',
      warning: '#F59E0B',
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
    accent: '#E8EEFF',
    accentForeground: '#1E3A8A',
    destructive: '#E11D48',
    destructiveForeground: '#FFFFFF',
    success: '#16A34A',
    warning: '#D97706',
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
  shadows: typeof shadows;
  typography: typeof typography;
};

export function createTheme(
  appearance: Appearance,
  brand: BrandTheme,
  systemDark: boolean,
): Theme {
  const resolved = appearance === 'system' ? (systemDark ? 'dark' : 'light') : appearance;
  return {
    appearance,
    resolved,
    brand,
    colors: buildPalette(resolved, brand),
    spacing,
    radius,
    shadows,
    typography,
  };
}
