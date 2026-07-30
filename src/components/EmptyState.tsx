import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
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

export function EmptyState({
  title,
  subtitle,
  icon = 'file-tray-outline',
  actionLabel,
  onAction,
}: EmptyProps) {
  const theme = useTheme();
  return (
    <Animated.View
      entering={theme.reduceMotion ? undefined : FadeIn}
      style={[styles.wrap, { padding: theme.spacing[8], gap: theme.spacing[3] }]}
      accessible
      accessibilityLabel={`${title}. ${subtitle ?? ''}`}
    >
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
    </Animated.View>
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

export function LoadingSkeleton({
  height = 120,
  count = 1,
}: {
  height?: number;
  count?: number;
}) {
  const theme = useTheme();
  const translateX = useSharedValue(-180);
  useEffect(() => {
    if (theme.reduceMotion) return;
    translateX.value = withRepeat(withTiming(520, { duration: 1100 }), -1, false);
  }, [theme.reduceMotion, translateX]);
  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ gap: theme.spacing[3] }} accessibilityLabel="Loading" accessibilityRole="progressbar">
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            {
              height,
              width: '100%',
              backgroundColor: theme.colors.muted,
              borderRadius: theme.radius.lg,
              overflow: 'hidden',
            },
          ]}
        >
          {!theme.reduceMotion ? (
            <Animated.View style={[styles.shimmer, shimmerStyle]}>
              <LinearGradient
                colors={['transparent', theme.colors.card, 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          ) : null}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  center: { textAlign: 'center' },
  shimmer: { position: 'absolute', top: 0, bottom: 0, width: 160 },
});
