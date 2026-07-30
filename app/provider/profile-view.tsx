import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Provider profile" onBack>
      <Text variant="body" muted>Public-facing preview of your profile.</Text>

    </Screen>
  );
}
