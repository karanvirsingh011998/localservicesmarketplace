import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Rewards" onBack>
      <Text variant="body" muted>You have 420 reward points (mock).</Text>
      <Button title="Refer & earn" variant="ghost" onPress={() => router.push('/refer' as any)} />
    </Screen>
  );
}
