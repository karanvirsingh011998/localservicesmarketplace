import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Button } from './Button';

type EmptyProps = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, subtitle, icon = 'file-tray-outline', actionLabel, onAction }: EmptyProps) {
  const theme = useTheme();
  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Ionicons name={icon} size={48} color={theme.colors.mutedForeground} />
      <Text variant="title" style={styles.center}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="body" muted style={styles.center}>
          {subtitle}
        </Text>
      ) : null}
      {actionLabel && onAction ? <Button title={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  subtitle = 'Please try again.',
  onRetry,
}: {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      title={title}
      subtitle={subtitle}
      icon="alert-circle-outline"
      actionLabel={onRetry ? 'Retry' : undefined}
      onAction={onRetry}
    />
  );
}

export function LoadingSkeleton({ height = 120 }: { height?: number }) {
  const theme = useTheme();
  return (
    <View
      accessibilityLabel="Loading"
      style={[
        styles.skeleton,
        {
          height,
          backgroundColor: theme.colors.muted,
          borderRadius: theme.radius.lg,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  center: { textAlign: 'center' },
  skeleton: { width: '100%', opacity: 0.7 },
});
