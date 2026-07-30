import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type Props = {
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  onClear?: () => void;
};

export function SearchBar({
  value,
  placeholder = 'Search services, providers…',
  onPress,
  onClear,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel="Search"
      onPress={onPress}
      style={[
        styles.bar,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          minHeight: 48,
        },
      ]}
    >
      <Ionicons name="search" size={20} color={theme.colors.mutedForeground} />
      <Text
        variant="body"
        color={value ? theme.colors.foreground : theme.colors.mutedForeground}
        style={styles.text}
        numberOfLines={1}
      >
        {value || placeholder}
      </Text>
      {value ? (
        <Pressable onPress={onClear} accessibilityLabel="Clear search" hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={theme.colors.mutedForeground} />
        </Pressable>
      ) : (
        <View />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  text: { flex: 1 },
});
