import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import type { Provider } from '@/mocks/data';

type Props = {
  provider: Provider;
  index?: number;
  onPress?: () => void;
};

export function ProviderCard({ provider, index = 0, onPress }: Props) {
  const theme = useTheme();
  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${provider.name}, rating ${provider.rating}`}
        style={({ pressed }) => [
          styles.card,
          theme.shadows.small,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.lg,
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <Image source={{ uri: provider.avatar }} style={styles.avatar} />
        <View style={styles.body}>
          <View style={styles.row}>
            <Text variant="title">{provider.name}</Text>
            {provider.verified ? (
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
            ) : null}
          </View>
          <Text variant="caption" muted>
            {provider.title} · {provider.distanceKm} km
          </Text>
          <View style={styles.row}>
            <Ionicons name="star" size={14} color={theme.colors.warning} />
            <Text variant="caption">
              {provider.rating} ({provider.reviews})
            </Text>
            <Text variant="caption" muted>
              · from ₹{provider.priceFrom}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  body: { flex: 1, gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
