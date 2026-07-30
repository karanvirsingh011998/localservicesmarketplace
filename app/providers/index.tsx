import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, ProviderCard, Button, EmptyState } from '@/components';
import { providers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderListing() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Providers" onBack scroll={false}>
      <FlatList
        data={providers}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[5],
          gap: theme.spacing[3],
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <Button title="Filters" variant="secondary" onPress={() => router.push('/shared/filters')} />
        }
        ListEmptyComponent={<EmptyState title="No providers nearby" />}
        renderItem={({ item }) => (
          <ProviderCard provider={item} onPress={() => router.push(`/providers/${item.id}`)} />
        )}
      />
    </Screen>
  );
}
