import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, BookingCard, Chip, Button } from '@/components';
import { bookings } from '@/mocks/data';

export default function Bookings() {
  const router = useRouter();
  const [tab, setTab] = useState<'active' | 'history'>('active');
  const list = bookings.filter((b) =>
    tab === 'active' ? b.status !== 'completed' && b.status !== 'cancelled' : b.status === 'completed' || b.status === 'cancelled',
  );
  return (
    <Screen title="Bookings" onBack={false}>
      <View style={styles.row}>
        <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
        <Chip label="History" selected={tab === 'history'} onPress={() => setTab('history')} />
      </View>
      {list.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(`/booking/${b.id}`)} />
      ))}
      <Button title="Browse services" variant="secondary" onPress={() => router.push('/service')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 8 } });
