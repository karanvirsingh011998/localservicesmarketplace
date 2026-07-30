import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Button } from '@/components';

export default function Sort() {
  const router = useRouter();
  return (
    <Screen title="Sort" onBack>
      {['Relevance', 'Distance', 'Rating', 'Price'].map((s) => (
        <Button key={s} title={s} variant="ghost" onPress={() => router.back()} />
      ))}
    </Screen>
  );
}
