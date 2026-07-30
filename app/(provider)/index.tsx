import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, BookingCard, Badge } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderDashboard() {
  const router = useRouter();
  const theme = useTheme();
  const pending = bookings.filter((b) => b.status === 'pending' || b.status === 'accepted');
  return (
    <Screen title="Dashboard" subtitle="Today's overview" onBack={false} right={<Badge label="Online" tone="success" />}>
      <View style={styles.stats}>
        {[
          ['₹4,820', "Today"],
          ['6', 'Jobs'],
          ['4.9', 'Rating'],
        ].map(([v, l]) => (
          <View key={l} style={[styles.stat, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
            <Text variant="h3">{v}</Text>
            <Text variant="caption" muted>{l}</Text>
          </View>
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
  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, padding: 14, gap: 4 },
});
