import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, ProviderCard } from '@/components';
import { services, providers, offers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Discover() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Discover" subtitle="Recommended near you" onBack={false}>
      <Text variant="h4">Today's offers</Text>
      <View style={styles.row}>
        {offers.map((o) => (
          <Chip key={o.id} label={o.code} onPress={() => router.push('/offers')} />
        ))}
      </View>
      <Text variant="h4">Recommended services</Text>
      {services.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(`/service/${s.id}`)}
          style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.img} />
          <View style={{ flex: 1 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted>from ₹{s.priceFrom}</Text>
          </View>
        </Pressable>
      ))}
      <Text variant="h4">Top rated professionals</Text>
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { flexDirection: 'row', gap: 12, padding: 10 },
  img: { width: 64, height: 64, borderRadius: 10 },
});
