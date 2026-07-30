import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AccessibilityInfo, useColorScheme } from 'react-native';
import { createTheme, type Appearance, type BrandTheme, type Theme } from './tokens';
import { useAppStore } from '@/store/app-store';

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const appearance = useAppStore((s) => s.appearance);
  const brand = useAppStore((s) => s.brand);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (mounted) setReduceMotion(v);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  const theme = useMemo(
    () => createTheme(appearance, brand, system === 'dark', reduceMotion),
    [appearance, brand, system, reduceMotion],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}

export type { Appearance, BrandTheme, Theme };
