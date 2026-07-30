import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, BookingCard } from '@/components';
import { bookings } from '@/mocks/data';

export default function History() {
  const router = useRouter();
  return (
    <Screen title="Booking history" onBack>
      {bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled').map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(`/booking/${b.id}`)} />
      ))}
    </Screen>
  );
}
