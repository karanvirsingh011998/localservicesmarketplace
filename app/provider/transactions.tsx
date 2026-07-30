import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Transaction history" onBack>
      <Text variant="body" muted>Payouts and job settlements (mock).</Text>

    </Screen>
  );
}
