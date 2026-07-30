import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, ProviderCard, EmptyState } from '@/components';
import { providers } from '@/mocks/data';

export default function Favorites() {
  const router = useRouter();
  const favs = providers.slice(0, 2);
  return (
    <Screen title="Favorites" onBack>
      <Text variant="subtitle">Favourite providers</Text>
      {favs.length === 0 ? (
        <EmptyState title="No favorites yet" subtitle="Heart a provider to save them here." />
      ) : (
        favs.map((p) => (
          <ProviderCard key={p.id} provider={p} onPress={() => router.push(`/providers/${p.id}`)} />
        ))
      )}
    </Screen>
  );
}
