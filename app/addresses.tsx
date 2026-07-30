import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Card, Button, EmptyState } from '@/components';
import { addresses } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Addresses() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Saved addresses" onBack>
      {addresses.length === 0 ? (
        <EmptyState title="No addresses" actionLabel="Add address" onAction={() => router.push('/booking/add-address')} />
      ) : (
        addresses.map((a) => (
          <Card key={a.id}>
            <Text variant="title">{a.label}</Text>
            <Text variant="caption" muted>
              {a.line1}, {a.city} {a.pin}
            </Text>
          </Card>
        ))
      )}
      <Button title="Add address" onPress={() => router.push('/booking/add-address')} />
    </Screen>
  );
}
