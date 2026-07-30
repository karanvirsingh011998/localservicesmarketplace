import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Availability" onBack>
      <Text variant="body" muted>Toggle online hours and service radius (mock).</Text>

    </Screen>
  );
}
