import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, ProviderCard, Text } from '@/components';
import { providers } from '@/mocks/data';

export default function Favorites() {
  const router = useRouter();
  return (
    <Screen title="Favorites" onBack>
      <Text variant="subtitle">Favourite providers</Text>
      {providers.slice(0, 2).map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}
    </Screen>
  );
}
