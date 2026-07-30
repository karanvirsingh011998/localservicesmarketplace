import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, ProviderCard, Chip, Button, BottomSheet } from '@/components';
import { providers, services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function SearchResults() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [filters, setFilters] = useState(false);
  const [sort, setSort] = useState(false);
  const query = (q || '').toLowerCase();
  const matchedProviders = providers.filter((p) => !query || p.name.toLowerCase().includes(query) || p.title.toLowerCase().includes(query));
  const matchedServices = services.filter((s) => !query || s.name.toLowerCase().includes(query));

  return (
    <Screen title="Search results" subtitle={q || 'All'} onBack>
      <View style={styles.row}>
        <Chip label="Filters" onPress={() => setFilters(true)} />
        <Chip label="Sort" onPress={() => setSort(true)} />
        <Chip label="Verified" />
        <Chip label="Nearby" />
      </View>
      <Text variant="h4">Services</Text>
      {matchedServices.map((s) => (
        <Button key={s.id} title={`${s.name} · from ₹${s.priceFrom}`} variant="ghost" onPress={() => router.push(`/service/${s.id}`)} />
      ))}
      <Text variant="h4">Providers</Text>
      {matchedProviders.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}
      <BottomSheet visible={filters} title="Filters" onClose={() => setFilters(false)}>
        {['Distance', 'Rating', 'Price', 'Availability', 'Emergency', 'Verified only'].map((f) => (
          <Chip key={f} label={f} />
        ))}
        <Button title="Apply" onPress={() => setFilters(false)} />
      </BottomSheet>
      <BottomSheet visible={sort} title="Sort by" onClose={() => setSort(false)}>
        {['Relevance', 'Distance', 'Rating', 'Price: low to high'].map((f) => (
          <Button key={f} title={f} variant="ghost" onPress={() => setSort(false)} />
        ))}
      </BottomSheet>
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
