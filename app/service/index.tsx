import React from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, ServiceCard, EmptyState } from '@/components';
import { services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ServiceListing() {
  const router = useRouter();
  const theme = useTheme();
  const { subcategoryId } = useLocalSearchParams<{ subcategoryId?: string }>();
  const list = subcategoryId
    ? services.filter((s) => s.subcategoryId === subcategoryId)
    : services;

  return (
    <Screen title="Services" onBack scroll={false}>
      <FlatList
        data={list}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[5],
          gap: theme.spacing[3],
          paddingBottom: 40,
        }}
        ListEmptyComponent={
          <EmptyState title="No services" subtitle="Try another category." />
        }
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={() => router.push(`/service/${item.id}`)} />
        )}
      />
    </Screen>
  );
}
