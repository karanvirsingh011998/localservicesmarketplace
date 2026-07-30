import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Screen,
  Text,
  SearchBar,
  CategoryCard,
  ProviderCard,
  ServiceCard,
  Chip,
  Badge,
  OfferCard,
  StaggeredItem,
} from '@/components';
import {
  featuredQuickAccess,
  providers,
  offers,
  services,
} from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function GuestHome() {
  const router = useRouter();
  const theme = useTheme();
  const location = useAppStore((s) => s.locationLabel);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const bannerW = Math.min(280, width * 0.72);

  const emergency = useMemo(() => services.filter((s) => s.emergency), []);

  return (
    <Screen
      title={greeting()}
      subtitle={location}
      onBack={false}
      collapsibleHeader
      right={<Badge label="Guest" />}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 800);
      }}
    >
      <Pressable
        onPress={() => router.push('/shared/location-picker')}
        accessibilityRole="button"
        accessibilityLabel={`Change location, currently ${location}`}
        style={{ alignSelf: 'flex-start' }}
      >
        <Text variant="caption" tone="primary">
          Change location
        </Text>
      </Pressable>

      <SearchBar onPress={() => router.push('/(guest)/search')} />

      <Animated.View entering={theme.reduceMotion ? undefined : FadeInDown.delay(40)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: theme.spacing[3] }}
        >
          {offers.map((o) => (
            <View key={o.id} style={{ width: bannerW }}>
              <OfferCard
                {...o}
                onCopy={() => router.push('/offers')}
              />
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={styles.sectionHead}>
        <Text variant="h4">Featured categories</Text>
        <Pressable
          onPress={() => router.push('/(guest)/categories')}
          accessibilityRole="button"
          accessibilityLabel="See all categories"
        >
          <Text variant="caption" tone="primary">
            See all
          </Text>
        </Pressable>
      </View>
      <View style={[styles.grid, { gap: theme.spacing[2] }]}>
        {featuredQuickAccess.map((c) => (
          <CategoryCard
            key={c.id}
            category={c}
            compact
            onPress={() => router.push(`/category/${c.categoryId}`)}
          />
        ))}
      </View>

      <View style={styles.sectionHead}>
        <Text variant="h4">Popular services</Text>
        <Pressable onPress={() => router.push('/service')} accessibilityRole="button">
          <Text variant="caption" tone="primary">
            See all
          </Text>
        </Pressable>
      </View>
      {services.slice(0, 4).map((s, index) => (
        <StaggeredItem key={s.id} index={index}>
          <ServiceCard service={s} onPress={() => router.push(`/service/${s.id}`)} />
        </StaggeredItem>
      ))}

      <Text variant="h4">Nearby providers</Text>
      {providers.map((p, index) => (
        <StaggeredItem key={p.id} index={index}>
          <ProviderCard provider={p} onPress={() => router.push(`/providers/${p.id}`)} />
        </StaggeredItem>
      ))}

      <Text variant="h4">Emergency</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {emergency.map((s) => (
          <Chip key={s.id} label={s.name} onPress={() => router.push(`/service/${s.id}`)} />
        ))}
        <Chip label="Emergency electrician" onPress={() => router.push('/category/cat-emergency')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
