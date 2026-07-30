import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="About QuickFix" onBack>
      <Text variant="body" muted>UI-only demo of a local services marketplace.</Text>

    </Screen>
  );
}
