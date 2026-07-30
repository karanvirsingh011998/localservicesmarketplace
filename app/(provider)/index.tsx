import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, BookingCard, Badge, Card } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderDashboard() {
  const router = useRouter();
  const theme = useTheme();
  const [online, setOnline] = useState(true);
  const pending = bookings.filter((b) => b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress');

  return (
    <Screen
      title="Dashboard"
      subtitle="Today's overview"
      onBack={false}
      right={<Badge label={online ? 'Online' : 'Offline'} tone={online ? 'success' : 'warning'} />}
    >
      <View
        style={[
          styles.onlineRow,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.lg,
            padding: theme.spacing[4],
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text variant="title">Availability</Text>
          <Text variant="caption" muted>
            Toggle to receive new job requests
          </Text>
        </View>
        <Switch
          value={online}
          onValueChange={setOnline}
          accessibilityLabel="Availability toggle"
          trackColor={{ true: theme.colors.primary, false: theme.colors.border }}
        />
      </View>

      <View style={[styles.stats, { gap: theme.spacing[2.5] }]}>
        {[
          ['₹4,820', 'Today'],
          ['6', 'Jobs'],
          ['4.9', 'Rating'],
        ].map(([v, l]) => (
          <Card key={l} elevated style={{ flex: 1, gap: theme.spacing[1] }}>
            <Text variant="h3">{v}</Text>
            <Text variant="caption" muted>
              {l}
            </Text>
          </Card>
        ))}
      </View>

      <Button title="New booking requests" onPress={() => router.push('/provider/requests')} />
      <Button title="Availability" variant="secondary" onPress={() => router.push('/provider/availability')} />
      <Text variant="h4">Active jobs</Text>
      {pending.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(`/provider/jobs/${b.id}`)} />
      ))}
      <Button title="Analytics" variant="ghost" onPress={() => router.push('/provider/analytics')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stats: { flexDirection: 'row' },
});
