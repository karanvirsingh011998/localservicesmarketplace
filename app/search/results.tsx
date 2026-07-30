import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Screen,
  Text,
  ProviderCard,
  ServiceCard,
  Chip,
  Button,
  BottomSheet,
  EmptyState,
} from '@/components';
import { providers, services, categories, subcategories } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function SearchResults() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [filters, setFilters] = useState(false);
  const [sort, setSort] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const query = (q || '').toLowerCase();

  const matchedServices = useMemo(() => {
    const fromCats = categories
      .filter((c) => c.name.toLowerCase().includes(query))
      .map((c) => c.id);
    const fromSubs = subcategories
      .filter((s) => s.name.toLowerCase().includes(query))
      .map((s) => s.categoryId);
    return services.filter(
      (s) =>
        !query ||
        s.name.toLowerCase().includes(query) ||
        fromCats.includes(s.categoryId) ||
        fromSubs.includes(s.categoryId),
    );
  }, [query]);

  const matchedProviders = useMemo(
    () =>
      providers.filter((p) => {
        if (verifiedOnly && !p.verified) return false;
        return (
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query)
        );
      }),
    [query, verifiedOnly],
  );

  const empty = matchedServices.length === 0 && matchedProviders.length === 0;

  return (
    <Screen title="Search results" subtitle={q || 'All'} onBack>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        <Chip label="Filters" onPress={() => setFilters(true)} />
        <Chip label="Sort" onPress={() => setSort(true)} />
        <Chip
          label="Verified"
          selected={verifiedOnly}
          onPress={() => setVerifiedOnly((v) => !v)}
        />
        <Chip label="Nearby" onPress={() => setFilters(true)} />
      </View>

      {empty ? (
        <EmptyState
          title="No matches"
          subtitle="Try another keyword or clear filters."
          icon="search-outline"
          actionLabel="Clear"
          onAction={() => router.replace('/search')}
        />
      ) : (
        <>
          {matchedServices.length > 0 ? (
            <>
              <Text variant="h4">Services ({matchedServices.length})</Text>
              {matchedServices.map((s) => (
                <ServiceCard key={s.id} service={s} onPress={() => router.push(`/service/${s.id}`)} />
              ))}
            </>
          ) : null}
          {matchedProviders.length > 0 ? (
            <>
              <Text variant="h4">Providers ({matchedProviders.length})</Text>
              {matchedProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} onPress={() => router.push(`/providers/${p.id}`)} />
              ))}
            </>
          ) : null}
        </>
      )}

      <BottomSheet visible={filters} title="Filters" onClose={() => setFilters(false)}>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          {['Distance', 'Rating 4+', 'Price', 'Availability', 'Emergency', 'Verified only'].map((f) => (
            <Chip
              key={f}
              label={f}
              selected={f === 'Verified only' && verifiedOnly}
              onPress={() => {
                if (f === 'Verified only') setVerifiedOnly(true);
              }}
            />
          ))}
        </View>
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

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
