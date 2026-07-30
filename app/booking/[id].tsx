import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Badge, Button, Divider } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const timeline = [
  'Booking placed',
  'Provider accepted',
  'Provider on the way',
  'Service started',
  'Service completed',
];

export default function BookingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Booking details" onBack>
      <View style={styles.row}>
        <Text variant="h4" style={{ flex: 1 }}>{booking.serviceName}</Text>
        <Badge label={booking.status.replace('_', ' ')} />
      </View>
      <Text variant="body">{booking.providerName}</Text>
      <Text variant="caption" muted>{booking.date} · {booking.time}</Text>
      <Text variant="caption" muted>{booking.address}</Text>
      <Text variant="title">₹{booking.price}</Text>
      <Divider />
      <Text variant="h4">Timeline</Text>
      {timeline.map((step, i) => (
        <View key={step} style={styles.step}>
          <View style={[styles.dot, { backgroundColor: i < 3 ? theme.colors.primary : theme.colors.border }]} />
          <Text variant="body" muted={i >= 3}>{step}</Text>
        </View>
      ))}
      <Button title="Chat" onPress={() => router.push('/chat/m1')} />
      <Button title="Reschedule" variant="secondary" onPress={() => router.push(`/booking/reschedule?id=${booking.id}`)} />
      <Button title="Cancel" variant="ghost" onPress={() => router.push(`/booking/cancel?id=${booking.id}`)} />
      <Button title="Active booking view" variant="ghost" onPress={() => router.push('/booking/active')} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
