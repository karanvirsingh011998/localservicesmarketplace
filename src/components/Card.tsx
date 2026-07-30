import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'link' | 'none';
  selected?: boolean;
};

export function Card({
  children,
  onPress,
  style,
  elevated = true,
  accessibilityLabel,
  accessibilityRole = 'button',
  selected,
}: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const baseStyle = [
    {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      padding: theme.spacing[3.5],
      borderWidth: selected ? 2 : 0,
      borderColor: selected ? theme.colors.primary : 'transparent',
    },
    elevated ? theme.shadows.small : null,
    style,
  ];

  if (!onPress) {
    return <View style={baseStyle}>{children}</View>;
  }

  return (
    <AnimatedPressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={selected !== undefined ? { selected } : undefined}
      onPressIn={() => {
        if (!theme.reduceMotion) {
          scale.value = withSpring(theme.motion.cardPressScale, theme.motion.spring);
        }
      }}
      onPressOut={() => {
        scale.value = withSpring(1, theme.motion.spring);
      }}
      onPress={onPress}
      style={[baseStyle, anim]}
    >
      {children}
    </AnimatedPressable>
  );
}
