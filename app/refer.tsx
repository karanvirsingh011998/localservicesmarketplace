import React from 'react';
import { Screen, Text, Button } from '@/components';
import { useToast } from '@/components';

export default function Refer() {
  const toast = useToast();
  return (
    <Screen title="Refer & earn" onBack>
      <Text variant="h3">Invite friends</Text>
      <Text variant="body" muted>Share code QUICKFIX50 — both get ₹50 credit (mock).</Text>
      <Button title="Copy invite link" onPress={() => toast.show('Link copied')} />
    </Screen>
  );
}
