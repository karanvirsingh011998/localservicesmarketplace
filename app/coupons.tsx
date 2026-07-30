import React from 'react';
import { Screen, Text, Button, useToast, OfferCard } from '@/components';
import { offers } from '@/mocks/data';

export default function Coupons() {
  const toast = useToast();
  return (
    <Screen title="Coupons" onBack>
      <Text variant="body" muted>
        Apply codes during booking summary (mock).
      </Text>
      {offers.map((o) => (
        <OfferCard key={o.id} {...o} onCopy={() => toast.show(`${o.code} ready to apply`)} />
      ))}
    </Screen>
  );
}
