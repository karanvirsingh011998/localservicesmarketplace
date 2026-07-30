import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Upload documents" onBack>
      <Text variant="body" muted>KYC and certificates upload UI (mock).</Text>

    </Screen>
  );
}
