import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Card, EmptyState } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const items = [
  ['New booking request', 'Emergency Plumber · BTM'],
  ['Payout processed', '₹5,000 sent to your bank'],
  ['Review received', 'Meera rated you 5 stars'],
];

export default function ProviderNotifications() {
  const theme = useTheme();
  return (
    <Screen title="Notifications" onBack>
      {items.length === 0 ? (
        <EmptyState title="All caught up" />
      ) : (
        items.map(([t, s]) => (
          <Card key={t}>
            <Text variant="title">{t}</Text>
            <Text variant="caption" muted>{s}</Text>
          </Card>
        ))
      )}
    </Screen>
  );
}
