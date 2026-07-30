import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Badge } from './Badge';
import { Card } from './Card';
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
    <Card
      onPress={onPress}
      accessibilityLabel={`${booking.serviceName}, ${booking.status.replace('_', ' ')}, ${booking.date} at ${booking.time}`}
    >
      <View style={styles.row}>
        <Text variant="title" style={{ flex: 1 }}>
          {booking.serviceName}
        </Text>
        <Badge label={booking.status.replace('_', ' ')} tone={statusTone[booking.status]} />
      </View>
      <Text variant="caption" muted>
        {booking.customerName || booking.providerName}
      </Text>
      <Text variant="body">
        {booking.date} · {booking.time}
      </Text>
      <Text variant="caption" muted>
        {booking.address}
      </Text>
      <Text variant="subtitle">₹{booking.price}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
