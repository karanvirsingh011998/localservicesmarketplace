import React, { memo } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Card } from './Card';
import type { Service } from '@/mocks/data';

type Props = {
  service: Service;
  onPress?: () => void;
};

function ServiceCardComponent({ service, onPress }: Props) {
  const theme = useTheme();
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${service.name}, from ₹${service.priceFrom}, rating ${service.rating}`}
      style={{ padding: theme.spacing[2.5], flexDirection: 'row', gap: theme.spacing[3] }}
    >
      <Image
        source={{ uri: service.image }}
        style={{
          width: 84,
          height: 84,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.muted,
        }}
        accessibilityLabel=""
      />
      <View style={{ flex: 1, gap: theme.spacing[1] }}>
        <Text variant="title" numberOfLines={2}>
          {service.name}
        </Text>
        <Text variant="caption" muted numberOfLines={2}>
          {service.description}
        </Text>
        <View style={styles.row}>
          <Ionicons name="star" size={theme.sizes.iconSm} color={theme.colors.warning} />
          <Text variant="caption">{service.rating}</Text>
          <Text variant="caption" muted>
            · from ₹{service.priceFrom}
          </Text>
        </View>
      </View>
    </Card>
  );
}

export const ServiceCard = memo(ServiceCardComponent);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
