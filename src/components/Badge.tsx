import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { withAlpha } from '@/theme/tokens';
import { Text } from './Text';

type Tone = 'default' | 'success' | 'warning' | 'danger';

type Props = {
  label: string;
  tone?: Tone;
};

export function Badge({ label, tone = 'default' }: Props) {
  const theme = useTheme();
  const bg =
    tone === 'success'
      ? withAlpha(theme.colors.success, 0.16)
      : tone === 'warning'
        ? withAlpha(theme.colors.warning, 0.16)
        : tone === 'danger'
          ? withAlpha(theme.colors.destructive, 0.16)
          : theme.colors.accent;
  const fg =
    tone === 'success'
      ? theme.colors.success
      : tone === 'warning'
        ? theme.colors.warning
        : tone === 'danger'
          ? theme.colors.destructive
          : theme.colors.accentForeground;
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.spacing[2.5],
          paddingVertical: theme.spacing[1],
        },
      ]}
    >
      <Text variant="caption" color={fg} style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {},
  text: { textTransform: 'capitalize' },
});
