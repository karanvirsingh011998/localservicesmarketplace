import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import type { typography } from '@/theme/tokens';

type Variant = keyof typeof typography;
type Tone = 'default' | 'muted' | 'primary' | 'destructive' | 'success' | 'warning';

type Props = RNTextProps & {
  variant?: Variant;
  color?: string;
  muted?: boolean;
  tone?: Tone;
};

const MAX_SCALE: Partial<Record<Variant, number>> = {
  display: 1.2,
  h1: 1.25,
  h2: 1.3,
};

export function Text({ variant = 'body', color, muted, tone = 'default', style, ...rest }: Props) {
  const theme = useTheme();
  const toneColor =
    tone === 'muted' || muted
      ? theme.colors.mutedForeground
      : tone === 'primary'
        ? theme.colors.primary
        : tone === 'destructive'
          ? theme.colors.destructive
          : tone === 'success'
            ? theme.colors.success
            : tone === 'warning'
              ? theme.colors.warning
              : theme.colors.foreground;

  const styles: TextStyle = {
    ...theme.typography[variant],
    color: color ?? toneColor,
  };

  return (
    <RNText
      maxFontSizeMultiplier={MAX_SCALE[variant] ?? 1.4}
      style={[styles, style]}
      {...rest}
    />
  );
}
