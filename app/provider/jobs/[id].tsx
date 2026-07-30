import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge, useToast, Modal } from '@/components';
import { bookings } from '@/mocks/data';

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id);
  const router = useRouter();
  const toast = useToast();
  const [status, setStatus] = useState(booking?.status ?? 'pending');

  if (!booking) {
    return (
      <Screen title="Job details" onBack>
        <Text>Job not found.</Text>
        <Button title="Back" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen title="Job details" onBack>
      <Badge label={status.replace('_', ' ')} />
      <Text variant="h4">{booking.serviceName}</Text>
      <Text variant="body">{booking.customerName || 'Customer'}</Text>
      <Text variant="body">{booking.address}</Text>
      <Text variant="caption" muted>
        {booking.date} · {booking.time}
      </Text>
      <Text variant="title">₹{booking.price}</Text>
      {status === 'pending' ? (
        <>
          <Button
            title="Accept"
            onPress={() => {
              setStatus('accepted');
              toast.show('Job accepted');
            }}
          />
          <Button
            title="Decline"
            variant="ghost"
            onPress={() => {
              setStatus('cancelled');
              toast.show('Job declined');
            }}
          />
        </>
      ) : null}
      {status === 'accepted' ? (
        <Button
          title="Start job"
          onPress={() => {
            setStatus('in_progress');
            toast.show('Job started');
          }}
        />
      ) : null}
      {status === 'in_progress' ? (
        <Button
          title="Mark completed"
          onPress={() => {
            setStatus('completed');
            toast.show('Job completed');
          }}
        />
      ) : null}
      <Button title="Chat" variant="secondary" onPress={() => router.push('/chat/m1')} />
    </Screen>
  );
}
