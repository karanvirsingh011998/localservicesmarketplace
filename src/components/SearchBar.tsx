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
      accessibilityLabel={value ? `Search: ${value}` : 'Search'}
      onPress={onPress}
      style={[
        styles.bar,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          minHeight: theme.sizes.control,
          gap: theme.spacing[2.5],
          paddingHorizontal: theme.spacing[3.5],
          borderWidth: 1,
        },
      ]}
    >
      <Ionicons name="search" size={theme.sizes.iconMd} color={theme.colors.mutedForeground} />
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
        <View style={{ width: 18 }} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { flex: 1 },
});
