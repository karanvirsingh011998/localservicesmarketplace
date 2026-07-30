import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, BookingCard, Text, Button, EmptyState, useToast } from '@/components';
import { bookings } from '@/mocks/data';

export default function Requests() {
  const router = useRouter();
  const toast = useToast();
  const pending = bookings.filter((b) => b.status === 'pending');

  return (
    <Screen title="New booking requests" onBack>
      <Text variant="body" muted>
        Accept or decline incoming jobs (mock actions).
      </Text>
      {pending.length === 0 ? (
        <EmptyState
          title="No requests"
          subtitle="New jobs will show up here."
          icon="briefcase-outline"
        />
      ) : (
        pending.map((b) => (
          <BookingCard
            key={b.id}
            booking={b}
            onPress={() => router.push(`/provider/jobs/${b.id}`)}
          />
        ))
      )}
      {pending.length > 0 ? (
        <Button title="Accept all (mock)" onPress={() => toast.show('Accepted (mock)')} />
      ) : null}
      <Button title="Back to jobs" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}
