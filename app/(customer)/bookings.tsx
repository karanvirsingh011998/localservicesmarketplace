import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, BookingCard, Button, EmptyState } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Bookings() {
  const router = useRouter();
  const theme = useTheme();
  const [tab, setTab] = useState<'active' | 'history'>('active');
  const [refreshing, setRefreshing] = useState(false);

  const list = useMemo(
    () =>
      bookings.filter((b) =>
        tab === 'active'
          ? b.status !== 'completed' && b.status !== 'cancelled'
          : b.status === 'completed' || b.status === 'cancelled',
      ),
    [tab],
  );

  return (
    <Screen
      title="Bookings"
      onBack={false}
      scroll={false}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 700);
      }}
    >
      <View style={{ paddingHorizontal: theme.spacing[5], flex: 1, gap: theme.spacing[3] }}>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
          <Chip label="History" selected={tab === 'history'} onPress={() => setTab('history')} />
        </View>
        {list.length === 0 ? (
          <EmptyState
            title={tab === 'active' ? 'No active bookings' : 'No history yet'}
            subtitle="Browse services to book your first visit."
            icon="calendar-outline"
            actionLabel="Browse services"
            onAction={() => router.push('/service')}
          />
        ) : (
          <FlatList
            data={list}
            keyExtractor={(b) => b.id}
            contentContainerStyle={{ gap: theme.spacing[3], paddingBottom: theme.spacing[10] }}
            renderItem={({ item }) => (
              <BookingCard booking={item} onPress={() => router.push(`/booking/${item.id}`)} />
            )}
            ListFooterComponent={
              <Button title="Browse services" variant="secondary" onPress={() => router.push('/service')} />
            }
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
