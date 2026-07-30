import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
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
      ? `${theme.colors.success}22`
      : tone === 'warning'
        ? `${theme.colors.warning}22`
        : tone === 'danger'
          ? `${theme.colors.destructive}22`
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
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: theme.radius.pill }]}>
      <Text variant="caption" color={fg} style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4 },
  text: { textTransform: 'capitalize' },
});
