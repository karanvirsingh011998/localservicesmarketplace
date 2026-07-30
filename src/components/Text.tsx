import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import type { typography } from '@/theme/tokens';

type Variant = keyof typeof typography;

type Props = RNTextProps & {
  variant?: Variant;
  color?: string;
  muted?: boolean;
};

export function Text({ variant = 'body', color, muted, style, ...rest }: Props) {
  const theme = useTheme();
  const styles: TextStyle = {
    ...theme.typography[variant],
    color: color ?? (muted ? theme.colors.mutedForeground : theme.colors.foreground),
  };
  return <RNText style={[styles, style]} {...rest} />;
}
