import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Chip } from '@/components';
import { categories, subcategories, services } from '@/mocks/data';
import { View, StyleSheet } from 'react-native';

export default function CategoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const category = categories.find((c) => c.id === id);
  const subs = subcategories.filter((s) => s.categoryId === id);
  const svcs = services.filter((s) => s.categoryId === id);
  return (
    <Screen title={category?.name || 'Category'} onBack>
      <Text variant="subtitle">Subcategories</Text>
      <View style={styles.row}>
        {subs.map((s) => (
          <Chip key={s.id} label={s.name} onPress={() => router.push({ pathname: '/service', params: { subcategoryId: s.id } })} />
        ))}
      </View>
      <Text variant="subtitle">Services</Text>
      {svcs.map((s) => (
        <Button key={s.id} title={`${s.name} · ₹${s.priceFrom}+`} variant="ghost" onPress={() => router.push(`/service/${s.id}`)} />
      ))}
      <Button title="Browse providers" onPress={() => router.push('/providers')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
