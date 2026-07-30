import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, ListRow, Card } from '@/components';
import { useAppStore } from '@/store/app-store';
import type { Appearance, BrandTheme } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

const brands: { id: BrandTheme; label: string }[] = [
  { id: 'royalBlue', label: 'Royal Blue' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'amber', label: 'Amber' },
  { id: 'purple', label: 'Purple' },
  { id: 'teal', label: 'Teal' },
  { id: 'rose', label: 'Rose' },
];
const appearances: Appearance[] = ['light', 'dark', 'system'];

export default function Settings() {
  const router = useRouter();
  const theme = useTheme();
  const appearance = useAppStore((s) => s.appearance);
  const brand = useAppStore((s) => s.brand);
  const setAppearance = useAppStore((s) => s.setAppearance);
  const setBrand = useAppStore((s) => s.setBrand);
  const [push, setPush] = useState(true);

  return (
    <Screen title="Settings" onBack>
      <Text variant="subtitle">Appearance</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {appearances.map((a) => (
          <Chip key={a} label={a} selected={appearance === a} onPress={() => setAppearance(a)} />
        ))}
      </View>
      <Text variant="subtitle">Brand theme</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {brands.map((b) => (
          <Chip key={b.id} label={b.label} selected={brand === b.id} onPress={() => setBrand(b.id)} />
        ))}
      </View>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text variant="title">Push notifications</Text>
            <Text variant="caption" muted>
              Booking updates and offers (mock)
            </Text>
          </View>
          <Switch value={push} onValueChange={setPush} accessibilityLabel="Push notifications" />
        </View>
      </Card>
      <ListRow title="Privacy policy" icon="shield-outline" onPress={() => router.push('/shared/privacy')} />
      <ListRow title="Terms" icon="document-text-outline" onPress={() => router.push('/shared/terms')} />
      <Button title="Done" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
