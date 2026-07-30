import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, StepIndicator, Card } from '@/components';
import { BOOKING_STEPS, addresses } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function SelectAddress() {
  const [id, setId] = useState(addresses[0].id);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);

  return (
    <Screen
      title="Select address"
      onBack
      footer={
        <Button
          title="Continue"
          onPress={() => {
            patch({ addressId: id });
            router.push('/booking/summary');
          }}
        />
      }
    >
      <StepIndicator steps={[...BOOKING_STEPS]} current={2} />
      {addresses.map((a) => (
        <Card
          key={a.id}
          selected={id === a.id}
          onPress={() => setId(a.id)}
          accessibilityLabel={`${a.label}, ${a.line1}`}
          elevated={false}
          style={{ borderWidth: 2, borderColor: id === a.id ? theme.colors.primary : theme.colors.border }}
        >
          <Text variant="title">{a.label}</Text>
          <Text variant="caption" muted>
            {a.line1}, {a.city} {a.pin}
          </Text>
        </Card>
      ))}
      <Button title="Add address" variant="secondary" onPress={() => router.push('/booking/add-address')} />
    </Screen>
  );
}
