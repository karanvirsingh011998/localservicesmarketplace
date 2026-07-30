import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Privacy Policy" onBack>
      <Text variant="body" muted>Placeholder privacy policy for the UI demo.</Text>

    </Screen>
  );
}
