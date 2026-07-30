import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Badge } from './Badge';
import type { Booking } from '@/mocks/data';

type Props = {
  booking: Booking;
  onPress?: () => void;
};

const statusTone: Record<Booking['status'], 'default' | 'success' | 'warning' | 'danger'> = {
  pending: 'warning',
  accepted: 'default',
  in_progress: 'default',
  completed: 'success',
  cancelled: 'danger',
};

export function BookingCard({ booking, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${booking.serviceName} booking`}
      style={[
        styles.card,
        theme.shadows.small,
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      <View style={styles.row}>
        <Text variant="title" style={{ flex: 1 }}>
          {booking.serviceName}
        </Text>
        <Badge label={booking.status.replace('_', ' ')} tone={statusTone[booking.status]} />
      </View>
      <Text variant="caption" muted>
        {booking.providerName}
      </Text>
      <Text variant="body">
        {booking.date} · {booking.time}
      </Text>
      <Text variant="caption" muted>
        {booking.address}
      </Text>
      <Text variant="subtitle">₹{booking.price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
