import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, BookingCard, Button } from '@/components';
import { bookings } from '@/mocks/data';

export default function ProviderJobs() {
  const [tab, setTab] = useState<'requests' | 'active' | 'completed'>('requests');
  const router = useRouter();
  const list =
    tab === 'requests'
      ? bookings.filter((b) => b.status === 'pending' || b.status === 'accepted')
      : tab === 'active'
        ? bookings.filter((b) => b.status === 'in_progress')
        : bookings.filter((b) => b.status === 'completed');
  return (
    <Screen title="Jobs" onBack={false}>
      <View style={styles.row}>
        <Chip label="Requests" selected={tab === 'requests'} onPress={() => setTab('requests')} />
        <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
        <Chip label="Completed" selected={tab === 'completed'} onPress={() => setTab('completed')} />
      </View>
      {list.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(`/provider/jobs/${b.id}`)} />
      ))}
      <Button title="Open requests screen" variant="ghost" onPress={() => router.push('/provider/requests')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
