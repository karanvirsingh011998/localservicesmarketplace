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
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  fullWidth,
  style,
  accessibilityLabel,
}: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const busy = !!loading;

  const bg =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.secondary
        : variant === 'destructive'
          ? theme.colors.destructive
          : 'transparent';
  const fg =
    variant === 'primary'
      ? theme.colors.primaryForeground
      : variant === 'destructive'
        ? theme.colors.destructiveForeground
        : variant === 'secondary'
          ? theme.colors.secondaryForeground
          : theme.colors.foreground;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: !!(disabled || busy), busy }}
      disabled={disabled || busy}
      onPressIn={() => {
        if (!theme.reduceMotion) {
          scale.value = withSpring(theme.motion.pressScale, theme.motion.spring);
        }
      }}
      onPressOut={() => {
        scale.value = withSpring(1, theme.motion.spring);
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
          minHeight: theme.sizes.control,
          paddingHorizontal: theme.spacing[5],
          paddingVertical: theme.spacing[3.5],
          alignSelf: fullWidth ? 'stretch' : undefined,
        },
        anim,
        style,
      ]}
    >
      {busy ? (
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
  },
});
