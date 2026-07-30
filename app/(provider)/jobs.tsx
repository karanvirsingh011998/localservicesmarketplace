import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, BookingCard, EmptyState } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

type Tab = 'requests' | 'active' | 'completed';

export default function ProviderJobs() {
  const [tab, setTab] = useState<Tab>('requests');
  const router = useRouter();
  const theme = useTheme();

  const list = useMemo(() => {
    if (tab === 'requests') return bookings.filter((b) => b.status === 'pending');
    if (tab === 'active')
      return bookings.filter((b) => b.status === 'accepted' || b.status === 'in_progress');
    return bookings.filter((b) => b.status === 'completed');
  }, [tab]);

  return (
    <Screen title="Jobs" onBack={false} scroll={false}>
      <View style={{ paddingHorizontal: theme.spacing[5], flex: 1, gap: theme.spacing[3] }}>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Chip label="Requests" selected={tab === 'requests'} onPress={() => setTab('requests')} />
          <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
          <Chip label="Completed" selected={tab === 'completed'} onPress={() => setTab('completed')} />
        </View>
        {list.length === 0 ? (
          <EmptyState title="No jobs" subtitle="New requests will show up here." icon="briefcase-outline" />
        ) : (
          <FlatList
            data={list}
            keyExtractor={(b) => b.id}
            contentContainerStyle={{ gap: theme.spacing[3], paddingBottom: theme.spacing[10] }}
            renderItem={({ item }) => (
              <BookingCard booking={item} onPress={() => router.push(`/provider/jobs/${item.id}`)} />
            )}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
