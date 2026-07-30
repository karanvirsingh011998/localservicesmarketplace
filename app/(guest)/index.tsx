import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen, Text, SearchBar, CategoryCard, ProviderCard, Chip, Badge } from '@/components';
import { categories, providers, offers, services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function GuestHome() {
  const router = useRouter();
  const theme = useTheme();
  const location = useAppStore((s) => s.locationLabel);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen
      title="Good afternoon"
      subtitle={location}
      onBack={false}
      right={<Badge label="Guest" />}
      refreshing={refreshing}
      onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); }}
    >
      <Pressable onPress={() => router.push('/shared/location-picker')}>
        <Text variant="caption" color={theme.colors.primary}>Change location</Text>
      </Pressable>
      <SearchBar onPress={() => router.push('/(guest)/search')} />

      <Animated.View entering={FadeInDown.delay(80)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {offers.map((o) => (
            <Pressable
              key={o.id}
              onPress={() => router.push('/offers')}
              style={[styles.banner, { backgroundColor: o.color, borderRadius: theme.radius.lg }]}
            >
              <Text variant="title" color="#fff">{o.title}</Text>
              <Text variant="caption" color="#fff">{o.subtitle}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      <Text variant="h4">Featured categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {categories.filter((c) => c.featured).map((c) => (
          <CategoryCard key={c.id} category={c} onPress={() => router.push(`/category/${c.id}`)} />
        ))}
      </ScrollView>

      <View style={styles.sectionHead}>
        <Text variant="h4">Popular services</Text>
        <Pressable onPress={() => router.push('/service')}><Text variant="caption" color={theme.colors.primary}>See all</Text></Pressable>
      </View>
      {services.slice(0, 3).map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(`/service/${s.id}`)}
          style={[styles.svc, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.svcImg} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted>from ₹{s.priceFrom} · ★ {s.rating}</Text>
          </View>
        </Pressable>
      ))}

      <Text variant="h4">Nearby providers</Text>
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}

      <Text variant="h4">Emergency</Text>
      <View style={styles.row}>
        <Chip label="Plumber now" onPress={() => router.push('/service/svc5')} />
        <Chip label="Electrician now" onPress={() => router.push('/(guest)/search')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { gap: 12, paddingVertical: 4 },
  banner: { width: 260, padding: 16, gap: 6, marginRight: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  svc: { flexDirection: 'row', gap: 12, padding: 10 },
  svcImg: { width: 72, height: 72, borderRadius: 12 },
});
