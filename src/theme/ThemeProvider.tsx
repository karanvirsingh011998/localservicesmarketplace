import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, type Appearance, type BrandTheme, type Theme } from './tokens';
import { useAppStore } from '@/store/app-store';

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const appearance = useAppStore((s) => s.appearance);
  const brand = useAppStore((s) => s.brand);
  const theme = useMemo(
    () => createTheme(appearance, brand, system === 'dark'),
    [appearance, brand, system],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}

export type { Appearance, BrandTheme, Theme };
