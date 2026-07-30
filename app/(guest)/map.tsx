import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, ProviderCard, BottomSheet, Button } from '@/components';
import { providers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const radii = ['2 KM', '5 KM', '10 KM', '25 KM', '50 KM'];

export default function MapTab() {
  const theme = useTheme();
  const router = useRouter();
  const [radius, setRadius] = useState('5 KM');
  const [sheet, setSheet] = useState(false);
  return (
    <Screen title="Map" subtitle="Mock map preview" onBack={false}>
      <View style={[styles.map, { backgroundColor: theme.colors.muted, borderRadius: theme.radius.xl }]}>
        <Text variant="title">Interactive map (UI mock)</Text>
        <Text variant="caption" muted>Markers · clustering · ETA placeholders</Text>
        {providers.map((p) => (
          <Pressable key={p.id} onPress={() => setSheet(true)} style={[styles.pin, { backgroundColor: theme.colors.primary }]}>
            <Text color="#fff" variant="caption">{p.name.split(' ')[0]}</Text>
          </Pressable>
        ))}
      </View>
      <Text variant="subtitle">Search radius</Text>
      <View style={styles.row}>
        {radii.map((r) => (
          <Chip key={r} label={r} selected={radius === r} onPress={() => setRadius(r)} />
        ))}
      </View>
      {providers.slice(0, 2).map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(`/providers/${p.id}`)} />
      ))}
      <BottomSheet visible={sheet} title="Nearby provider" onClose={() => setSheet(false)}>
        <Text>Ravi Kumar · 1.2 km · ETA 12 min</Text>
        <Button title="View profile" onPress={() => { setSheet(false); router.push('/providers/p1'); }} />
      </BottomSheet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  map: { height: 280, alignItems: 'center', justifyContent: 'center', gap: 12, overflow: 'hidden' },
  pin: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
