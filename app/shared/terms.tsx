import React from 'react';
import { Screen, Text } from '@/components';

export default function Terms() {
  return (
    <Screen title="Terms & Conditions" onBack>
      <Text variant="body" muted>
        Placeholder terms for the QuickFix UI demo. Bookings, payments, and chat are simulated and do not create real obligations.
      </Text>
    </Screen>
  );
}
