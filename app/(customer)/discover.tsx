import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Screen,
  Text,
  Chip,
  ServiceCard,
  ProviderCard,
  OfferCard,
  EmptyState,
} from '@/components';
import { services, providers, offers, featuredQuickAccess } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Discover() {
  const router = useRouter();
  const theme = useTheme();
  const [tag, setTag] = useState('For you');
  const tags = ['For you', 'Offers', 'Top rated', 'Emergency'];

  const list =
    tag === 'Offers'
      ? []
      : tag === 'Emergency'
        ? services.filter((s) => s.emergency)
        : tag === 'Top rated'
          ? services.filter((s) => s.rating >= 4.8)
          : services;

  return (
    <Screen title="Discover" subtitle="Curated near you" onBack={false}>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {tags.map((t) => (
          <Chip key={t} label={t} selected={tag === t} onPress={() => setTag(t)} />
        ))}
      </View>

      {tag === 'Offers' ? (
        offers.map((o) => (
          <OfferCard key={o.id} {...o} onCopy={() => router.push('/coupons')} />
        ))
      ) : list.length === 0 ? (
        <EmptyState title="Nothing here yet" subtitle="Try another collection." />
      ) : (
        <>
          <Text variant="h4">Collections</Text>
          <View style={[styles.row, { gap: theme.spacing[2] }]}>
            {featuredQuickAccess.slice(0, 6).map((c) => (
              <Chip
                key={c.id}
                label={c.name}
                onPress={() => router.push(`/category/${c.categoryId}`)}
              />
            ))}
          </View>
          <Text variant="h4">Services</Text>
          {list.map((s) => (
            <ServiceCard key={s.id} service={s} onPress={() => router.push(`/service/${s.id}`)} />
          ))}
          <Text variant="h4">Top rated professionals</Text>
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} onPress={() => router.push(`/providers/${p.id}`)} />
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
