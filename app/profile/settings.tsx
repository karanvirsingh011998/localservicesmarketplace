import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button } from '@/components';
import { useAppStore } from '@/store/app-store';
import type { Appearance, BrandTheme } from '@/theme/tokens';

const brands: BrandTheme[] = ['royalBlue', 'emerald', 'amber', 'purple', 'teal', 'rose'];
const appearances: Appearance[] = ['light', 'dark', 'system'];

export default function Settings() {
  const router = useRouter();
  const appearance = useAppStore((s) => s.appearance);
  const brand = useAppStore((s) => s.brand);
  const setAppearance = useAppStore((s) => s.setAppearance);
  const setBrand = useAppStore((s) => s.setBrand);
  return (
    <Screen title="Settings" onBack>
      <Text variant="subtitle">Appearance</Text>
      <View style={styles.row}>
        {appearances.map((a) => (
          <Chip key={a} label={a} selected={appearance === a} onPress={() => setAppearance(a)} />
        ))}
      </View>
      <Text variant="subtitle">Brand theme</Text>
      <View style={styles.row}>
        {brands.map((b) => (
          <Chip key={b} label={b} selected={brand === b} onPress={() => setBrand(b)} />
        ))}
      </View>
      <Button title="Privacy policy" variant="ghost" onPress={() => router.push('/shared/privacy')} />
      <Button title="Terms" variant="ghost" onPress={() => router.push('/shared/terms')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
