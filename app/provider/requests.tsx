import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="New booking requests" onBack>
      <Text variant="body" muted>Accept or decline incoming jobs (mock).</Text>

    </Screen>
  );
}
