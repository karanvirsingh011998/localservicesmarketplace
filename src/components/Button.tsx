import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
  accessibilityLabel,
}: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const bg =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.secondary
        : variant === 'destructive'
          ? theme.colors.destructive
          : 'transparent';
  const fg =
    variant === 'primary' || variant === 'destructive'
      ? theme.colors.primaryForeground
      : theme.colors.foreground;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      disabled={disabled || loading}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderRadius: theme.radius.md,
          opacity: disabled ? 0.5 : 1,
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: theme.colors.border,
          minHeight: 48,
        },
        anim,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text variant="button" color={fg}>
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
