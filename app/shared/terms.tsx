import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Terms & Conditions" onBack>
      <Text variant="body" muted>Placeholder terms for the UI demo.</Text>

    </Screen>
  );
}
