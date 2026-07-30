import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Portfolio" onBack>
      <Text variant="body" muted>Before & after gallery for your profile.</Text>

    </Screen>
  );
}
