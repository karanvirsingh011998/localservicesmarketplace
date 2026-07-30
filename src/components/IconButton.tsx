import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  accessibilityLabel: string;
  variant?: 'ghost' | 'filled';
  disabled?: boolean;
};

export function IconButton({
  name,
  onPress,
  size = 22,
  color,
  accessibilityLabel,
  variant = 'ghost',
  disabled,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            variant === 'filled' || pressed ? theme.colors.muted : 'transparent',
          borderRadius: theme.radius.pill,
          minWidth: theme.sizes.touch,
          minHeight: theme.sizes.touch,
          opacity: disabled ? 0.4 : 1,
        },
      ]}
    >
      <Ionicons name={name} size={size} color={color ?? theme.colors.foreground} />
    </Pressable>
  );
}
