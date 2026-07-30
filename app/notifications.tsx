import React from 'react';
import { Screen, Text, Card, EmptyState } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const items = [
  ['Booking accepted', 'Ravi accepted your plumbing request'],
  ['Reminder', 'AC service tomorrow at 11:00 AM'],
  ['Offer', 'WELCOME20 expires in 2 days'],
];

export default function Notifications() {
  const theme = useTheme();
  return (
    <Screen title="Notifications" onBack>
      {items.length === 0 ? (
        <EmptyState title="No notifications" />
      ) : (
        items.map(([t, s]) => (
          <Card key={t} accessibilityLabel={`${t}. ${s}`}>
            <Text variant="title">{t}</Text>
            <Text variant="caption" muted>
              {s}
            </Text>
          </Card>
        ))
      )}
    </Screen>
  );
}
