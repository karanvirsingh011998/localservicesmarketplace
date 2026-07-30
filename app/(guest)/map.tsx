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
  const [selected, setSelected] = useState<string | null>(null);
  const provider = providers.find((p) => p.id === selected) || providers[0];

  return (
    <Screen title="Map" subtitle="UI mock — not live GPS" onBack={false}>
      <View
        accessible
        accessibilityLabel={`Map preview showing ${providers.length} nearby providers within ${radius}`}
        style={[
          styles.map,
          {
            backgroundColor: theme.colors.muted,
            borderRadius: theme.radius.xl,
            gap: theme.spacing[3],
          },
        ]}
      >
        <Text variant="title">Nearby map (mock)</Text>
        <Text variant="caption" muted>
          Markers · radius · ETA placeholders
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {providers.map((p, i) => (
            <Pressable
              key={p.id}
              onPress={() => setSelected(p.id)}
              accessibilityRole="button"
              accessibilityLabel={`${p.name}, ${p.distanceKm} kilometers`}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 16,
                backgroundColor: selected === p.id ? theme.colors.primary : theme.colors.card,
                marginLeft: i * 12,
                marginTop: i % 2 === 0 ? 0 : 28,
              }}
            >
              <Text
                variant="caption"
                color={selected === p.id ? theme.colors.primaryForeground : theme.colors.foreground}
              >
                {p.name.split(' ')[0]} · {p.distanceKm}km
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Text variant="subtitle">Search radius</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {radii.map((r) => (
          <Chip key={r} label={r} selected={radius === r} onPress={() => setRadius(r)} />
        ))}
      </View>
      {providers.slice(0, 2).map((p) => (
        <ProviderCard key={p.id} provider={p} onPress={() => setSelected(p.id)} />
      ))}
      <BottomSheet visible={!!selected} title={provider.name} onClose={() => setSelected(null)}>
        <Text>
          {provider.distanceKm} km · ETA ~{Math.round(provider.distanceKm * 8)} min
        </Text>
        <Button
          title="View profile"
          onPress={() => {
            setSelected(null);
            router.push(`/providers/${provider.id}`);
          }}
        />
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: { height: 280, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
