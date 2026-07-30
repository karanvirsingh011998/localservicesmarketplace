import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button, StepIndicator, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';
import { services, providers, addresses } from '@/mocks/data';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function BookingSummary() {
  const draft = useAppStore((s) => s.bookingDraft);
  const patch = useAppStore((s) => s.patchBookingDraft);
  const router = useRouter();
  const service = services.find((s) => s.id === draft.serviceId) || services[0];
  const provider = providers.find((p) => p.id === draft.providerId) || providers[0];
  const address = addresses.find((a) => a.id === draft.addressId) || addresses[0];
  const [notes, setNotes] = useState(draft.notes || '');

  return (
    <Screen title="Booking summary" onBack>
      <StepIndicator steps={steps} current={3} />
      <Text variant="title">{service.name}</Text>
      <Text variant="body" muted>with {provider.name}</Text>
      <Text variant="body">{draft.date} · {draft.time}</Text>
      <Text variant="caption" muted>{address.line1}</Text>
      <Divider />
      <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="Access instructions, issue details…" multiline />
      <Button title="Upload images (mock)" variant="secondary" onPress={() => patch({ images: ['mock'] })} />
      <Text variant="h4">₹{service.priceFrom}</Text>
      <Button title="Continue to payment" onPress={() => { patch({ notes }); router.push('/booking/payment'); }} />
    </Screen>
  );
}
