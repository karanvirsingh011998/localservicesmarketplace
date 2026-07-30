import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, ProviderCard, Button } from '@/components';
import { providers } from '@/mocks/data';

export default function ProviderListing() {
  const router = useRouter();
  return (
    <Screen title="Providers" onBack>
      <Button title="Filters" variant="secondary" onPress={() => router.push('/shared/filters')} />
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}
    </Screen>
  );
}
