import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Avatar } from './Avatar';
import { Rating } from './Rating';
import { Card } from './Card';
import type { Provider } from '@/mocks/data';

type Props = {
  provider: Provider;
  index?: number;
  onPress?: () => void;
};

function ProviderCardComponent({ provider, onPress }: Props) {
  const theme = useTheme();
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${provider.name}, rating ${provider.rating}, ${provider.distanceKm} kilometers`}
      style={{ flexDirection: 'row', gap: theme.spacing[3], alignItems: 'center' }}
    >
      <Avatar uri={provider.avatar} name={provider.name} size={theme.sizes.avatarLg} />
      <View style={{ flex: 1, gap: theme.spacing[1] }}>
        <View style={styles.row}>
          <Text variant="title" style={{ flexShrink: 1 }}>
            {provider.name}
          </Text>
          {provider.verified ? (
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
          ) : null}
        </View>
        <Text variant="caption" muted>
          {provider.title} · {provider.distanceKm} km
        </Text>
        <View style={styles.row}>
          <Rating value={provider.rating} />
          <Text variant="caption">
            {provider.rating} ({provider.reviews})
          </Text>
          <Text variant="caption" muted>
            · from ₹{provider.priceFrom}
          </Text>
        </View>
      </View>
    </Card>
  );
}

export const ProviderCard = memo(ProviderCardComponent);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
});
