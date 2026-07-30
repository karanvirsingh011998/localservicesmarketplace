import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Calendar" onBack>
      <Text variant="body" muted>Month view of scheduled jobs (mock).</Text>

    </Screen>
  );
}
