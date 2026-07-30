import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Analytics" onBack>
      <Text variant="body" muted>Weekly jobs, conversion, and rating trends (mock charts).</Text>

    </Screen>
  );
}
