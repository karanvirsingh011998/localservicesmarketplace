import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  accessibilityLabel: string;
  variant?: 'ghost' | 'filled';
};

export function IconButton({
  name,
  onPress,
  size = 22,
  color,
  accessibilityLabel,
  variant = 'ghost',
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor:
            variant === 'filled' ? theme.colors.muted : pressed ? theme.colors.muted : 'transparent',
          borderRadius: theme.radius.pill,
          minWidth: 44,
          minHeight: 44,
        },
      ]}
    >
      <View>
        <Ionicons name={name} size={size} color={color ?? theme.colors.foreground} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { alignItems: 'center', justifyContent: 'center' },
});
