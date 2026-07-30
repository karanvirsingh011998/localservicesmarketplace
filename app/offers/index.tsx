import React from 'react';
import { Screen, OfferCard, useToast } from '@/components';
import { offers } from '@/mocks/data';

export default function Offers() {
  const toast = useToast();
  return (
    <Screen title="Offers" onBack>
      {offers.map((o) => (
        <OfferCard
          key={o.id}
          {...o}
          onCopy={() => toast.show(`Copied ${o.code} (mock)`)}
        />
      ))}
    </Screen>
  );
}
