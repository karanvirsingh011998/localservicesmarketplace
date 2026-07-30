import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  accessibilityLabel?: string;
};

export function FloatingActionButton({
  onPress,
  icon = 'add',
  accessibilityLabel = 'Create',
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
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
        styles.fab,
        theme.shadows.floating,
        anim,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.pill,
          width: theme.sizes.fab,
          height: theme.sizes.fab,
          right: theme.spacing[5],
          bottom: Math.max(insets.bottom, theme.spacing[5]) + theme.spacing[2],
        },
      ]}
    >
      <Ionicons name={icon} size={theme.sizes.iconXl} color={theme.colors.primaryForeground} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
