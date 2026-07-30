import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import type { Category } from '@/mocks/data';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  water: 'water',
  flash: 'flash',
  sparkles: 'sparkles',
  snow: 'snow',
  'color-palette': 'color-palette',
  hammer: 'hammer',
  tv: 'tv',
  bug: 'bug',
  'alert-circle': 'alert-circle',
};

type Props = {
  category: Category;
  onPress?: () => void;
};

export function CategoryCard({ category, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={category.name}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.lg,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      <View style={[styles.icon, { backgroundColor: `${category.color}22` }]}>
        <Ionicons
          name={iconMap[category.icon] ?? 'grid'}
          size={22}
          color={category.color}
        />
      </View>
      <Text variant="caption" numberOfLines={2} style={styles.label}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 88,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { textAlign: 'center' },
});
