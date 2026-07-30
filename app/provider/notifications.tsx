import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Notifications" onBack>
      <Text variant="body" muted>Job alerts and payout updates.</Text>

    </Screen>
  );
}
