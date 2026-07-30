import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, useToast } from '@/components';
import { services, providers } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

export default function Confirmation() {
  const router = useRouter();
  const toast = useToast();
  const draft = useAppStore((s) => s.bookingDraft);
  const service = services.find((s) => s.id === draft.serviceId) || services[0];
  const provider = providers.find((p) => p.id === draft.providerId) || providers[0];
  const [loading, setLoading] = useState(false);

  return (
    <Screen
      title="Confirm booking"
      onBack
      footer={
        <Button
          title="Place booking"
          loading={loading}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              toast.show('Booking placed');
              router.replace('/booking/success');
            }, 500);
          }}
        />
      }
    >
      <Text variant="h3">Review before placing</Text>
      <Text variant="body" muted>
        {service.name} with {provider.name}
      </Text>
      <Text variant="body">
        {draft.date} at {draft.time}
      </Text>
      <Text variant="h4">₹{service.priceFrom}</Text>
      <Text variant="caption" muted>
        Payment will be collected as selected (mock).
      </Text>
    </Screen>
  );
}
