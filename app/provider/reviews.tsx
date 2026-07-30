import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Customer reviews" onBack>
      <Text variant="body" muted>Ratings left by customers.</Text>

    </Screen>
  );
}
