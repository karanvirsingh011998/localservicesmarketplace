import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Screen,
  Text,
  Badge,
  Button,
  Divider,
  StatusTimeline,
  Modal,
} from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const STATUS_STEPS: Record<string, number> = {
  pending: 0,
  accepted: 1,
  in_progress: 3,
  completed: 4,
  cancelled: -1,
};

export default function BookingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const router = useRouter();
  const theme = useTheme();
  const [cancelOpen, setCancelOpen] = useState(false);
  const doneUntil = STATUS_STEPS[booking.status] ?? 0;

  const events = useMemo(
    () =>
      [
        'Booking placed',
        'Provider accepted',
        'Provider on the way',
        'Service started',
        'Service completed',
      ].map((label, i) => ({ label, done: doneUntil >= 0 && i <= doneUntil })),
    [doneUntil],
  );

  return (
    <Screen title="Booking details" onBack>
      <View style={styles.row}>
        <Text variant="h4" style={{ flex: 1 }}>
          {booking.serviceName}
        </Text>
        <Badge label={booking.status.replace('_', ' ')} />
      </View>
      <Text variant="body">{booking.providerName}</Text>
      <Text variant="caption" muted>
        {booking.date} · {booking.time}
      </Text>
      <Text variant="caption" muted>
        {booking.address}
      </Text>
      <Text variant="title">₹{booking.price}</Text>
      <Divider />
      <Text variant="h4">Timeline</Text>
      <StatusTimeline events={events} />
      <Button title="Chat" onPress={() => router.push('/chat/m1')} />
      <Button
        title="Reschedule"
        variant="secondary"
        onPress={() => router.push('/booking/reschedule')}
      />
      <Button title="Cancel booking" variant="ghost" onPress={() => setCancelOpen(true)} />
      <Modal visible={cancelOpen} title="Cancel booking?" onClose={() => setCancelOpen(false)}>
        <Text variant="body" muted>
          Are you sure you want to cancel this booking?
        </Text>
        <Button
          title="Yes, cancel"
          variant="destructive"
          onPress={() => {
            setCancelOpen(false);
            router.push('/booking/cancel');
          }}
        />
        <Button title="Keep booking" variant="ghost" onPress={() => setCancelOpen(false)} />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
