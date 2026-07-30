import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export function Chip({ label, selected, onPress, disabled }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        if (!theme.reduceMotion) {
          scale.value = withTiming(0.96, { duration: theme.motion.buttonMs });
        }
      }}
      onPressOut={() => {
        scale.value = withSpring(1, theme.motion.spring);
      }}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? theme.colors.primary : theme.colors.muted,
          borderRadius: theme.radius.pill,
          minHeight: theme.sizes.touch - 4,
          paddingHorizontal: theme.spacing[3.5],
          paddingVertical: theme.spacing[2],
          opacity: disabled ? 0.5 : 1,
        },
        animatedStyle,
      ]}
    >
      <Text
        variant="caption"
        color={selected ? theme.colors.primaryForeground : theme.colors.foreground}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export function Divider() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing[3],
      }}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
