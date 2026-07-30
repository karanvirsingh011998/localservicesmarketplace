import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Card, Chip } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Calendar() {
  const theme = useTheme();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
  });
  return (
    <Screen title="Calendar" subtitle="Upcoming jobs (mock)" onBack>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
        {days.map((d, i) => (
          <Chip key={d} label={d} selected={i === 0} />
        ))}
      </View>
      {bookings.filter(b => b.status !== 'cancelled').map((b) => (
        <Card key={b.id}>
          <Text variant="title">{b.serviceName}</Text>
          <Text variant="caption" muted>{b.date} · {b.time}</Text>
        </Card>
      ))}
    </Screen>
  );
}
