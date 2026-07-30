import React, { memo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { withAlpha } from '@/theme/tokens';
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
  home: 'home',
  construct: 'construct',
  laptop: 'laptop-outline',
  business: 'business',
  leaf: 'leaf',
  car: 'car',
  cut: 'cut',
  fitness: 'fitness',
  school: 'school',
  camera: 'camera',
  paw: 'paw',
  people: 'people',
  briefcase: 'briefcase',
  document: 'document-text',
  shield: 'shield-checkmark',
  storefront: 'storefront',
  shirt: 'shirt',
  bicycle: 'bicycle',
  homeOutline: 'home-outline',
  sparklesOutline: 'sparkles-outline',
  hardwareChip: 'hardware-chip',
  globe: 'globe',
  medkit: 'medkit',
};

type Props = {
  category: Category;
  onPress?: () => void;
  compact?: boolean;
};

function CategoryCardComponent({ category, onPress, compact }: Props) {
  const theme = useTheme();
  const width = compact ? undefined : 88;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={category.name}
      style={({ pressed }) => [
        styles.card,
        {
          width: compact ? '23%' : width,
          minWidth: compact ? undefined : 80,
          padding: theme.spacing[3],
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.lg,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed && !theme.reduceMotion ? 0.97 : 1 }],
          gap: theme.spacing[2],
        },
      ]}
    >
      <View
        style={{
          width: theme.sizes.avatarLg - 8,
          height: theme.sizes.avatarLg - 8,
          borderRadius: theme.radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(category.color, 0.14),
        }}
      >
        <Ionicons
          name={iconMap[category.icon] ?? 'grid'}
          size={theme.sizes.iconLg}
          color={category.color}
        />
      </View>
      <Text variant="caption" numberOfLines={2} style={styles.label}>
        {category.name}
      </Text>
    </Pressable>
  );
}

export const CategoryCard = memo(CategoryCardComponent);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  label: { textAlign: 'center' },
});
