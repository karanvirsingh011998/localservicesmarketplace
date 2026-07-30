import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, CategoryCard, TextField } from '@/components';
import { categories } from '@/mocks/data';

export default function Categories() {
  const router = useRouter();
  const [q, setQ] = React.useState('');
  const filtered = categories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen title="Categories" onBack={false}>
      <TextField placeholder="Search categories" value={q} onChangeText={setQ} />
      <Text variant="subtitle">Popular</Text>
      <View style={styles.grid}>
        {filtered.map((c) => (
          <CategoryCard key={c.id} category={c} onPress={() => router.push(`/category/${c.id}`)} />
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 } });
