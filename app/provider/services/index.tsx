import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { services } from '@/mocks/data';

export default function MyServices() {
  const router = useRouter();
  return (
    <Screen title="My services" onBack>
      {services.slice(0, 3).map((s) => (
        <Button key={s.id} title={`${s.name} · ₹${s.priceFrom}`} variant="ghost" onPress={() => router.push('/provider/services/edit')} />
      ))}
      <Button title="Add service" onPress={() => router.push('/provider/services/add')} />
    </Screen>
  );
}
