import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button, StepIndicator, Divider, useToast } from '@/components';
import { BOOKING_STEPS, services, providers, addresses } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

export default function BookingSummary() {
  const draft = useAppStore((s) => s.bookingDraft);
  const patch = useAppStore((s) => s.patchBookingDraft);
  const router = useRouter();
  const toast = useToast();
  const service = services.find((s) => s.id === draft.serviceId) || services[0];
  const provider = providers.find((p) => p.id === draft.providerId) || providers[0];
  const address = addresses.find((a) => a.id === draft.addressId) || addresses[0];
  const [notes, setNotes] = useState(draft.notes || '');

  return (
    <Screen
      title="Booking summary"
      onBack
      keyboard
      footer={
        <Button
          title="Continue to payment"
          onPress={() => {
            patch({ notes });
            router.push('/booking/payment');
          }}
        />
      }
    >
      <StepIndicator steps={[...BOOKING_STEPS]} current={3} />
      <Text variant="title">{service.name}</Text>
      <Text variant="body" muted>
        with {provider.name}
      </Text>
      <Text variant="body">
        {draft.date} · {draft.time}
      </Text>
      <Text variant="caption" muted>
        {address.line1}
      </Text>
      <Button title="Edit date" variant="ghost" onPress={() => router.push('/booking/date')} />
      <Divider />
      <TextField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Access instructions, issue details…"
        multiline
      />
      <Button
        title={draft.images.length ? `${draft.images.length} image(s) attached` : 'Upload images (mock)'}
        variant="secondary"
        onPress={() => {
          patch({ images: ['mock-1'] });
          toast.show('Image attached (mock)');
        }}
      />
      <Text variant="caption" muted>
        Subtotal
      </Text>
      <Text variant="h3">₹{service.priceFrom}</Text>
    </Screen>
  );
}
