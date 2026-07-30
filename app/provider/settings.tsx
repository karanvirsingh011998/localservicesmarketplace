import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Settings" onBack>
      <Text variant="body" muted>Provider preferences and privacy.</Text>

    </Screen>
  );
}
