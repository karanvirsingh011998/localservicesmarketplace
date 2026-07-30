import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Badge } from '@/components';

export default function ActiveBooking() {
  const router = useRouter();
  return (
    <Screen title="Active booking" onBack>
      <Badge label="In progress" />
      <Text variant="h3">Pipe Leak Repair</Text>
      <Text variant="body" muted>Ravi is on site · started 4:05 PM</Text>
      <Button title="Open timeline" onPress={() => router.push('/booking/timeline')} />
      <Button title="Chat with provider" variant="secondary" onPress={() => router.push('/chat/m1')} />
    </Screen>
  );
}
