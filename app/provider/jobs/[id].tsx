import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge } from '@/components';
import { bookings } from '@/mocks/data';

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const router = useRouter();
  return (
    <Screen title="Job details" onBack>
      <Badge label={booking.status.replace('_', ' ')} />
      <Text variant="h4">{booking.serviceName}</Text>
      <Text variant="body">{booking.address}</Text>
      <Text variant="caption" muted>{booking.date} · {booking.time}</Text>
      <Text variant="title">₹{booking.price}</Text>
      <Button title="Accept" onPress={() => {}} />
      <Button title="Start job" variant="secondary" onPress={() => {}} />
      <Button title="Chat" variant="ghost" onPress={() => router.push('/chat/m1')} />
    </Screen>
  );
}
