import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, CategoryCard, TextField, Chip, EmptyState } from '@/components';
import { categories, featuredCategoryIds } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Categories() {
  const router = useRouter();
  const theme = useTheme();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | 'featured' | 'popular'>('all');

  const filtered = useMemo(() => {
    let list = categories;
    if (filter === 'featured') list = list.filter((c) => featuredCategoryIds.includes(c.id));
    if (filter === 'popular') list = list.filter((c) => c.popular);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(needle));
    }
    return list;
  }, [q, filter]);

  return (
    <Screen title="Categories" subtitle={`${categories.length} categories`} onBack={false} scroll={false}>
      <View style={{ paddingHorizontal: theme.spacing[5], gap: theme.spacing[3], flex: 1 }}>
        <TextField
          placeholder="Search categories"
          value={q}
          onChangeText={setQ}
          accessibilityLabel="Search categories"
        />
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Chip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip label="Featured" selected={filter === 'featured'} onPress={() => setFilter('featured')} />
          <Chip label="Popular" selected={filter === 'popular'} onPress={() => setFilter('popular')} />
        </View>
        {filtered.length === 0 ? (
          <EmptyState
            title="No categories found"
            subtitle="Try a different search."
            icon="search-outline"
            actionLabel="Clear"
            onAction={() => {
              setQ('');
              setFilter('all');
            }}
          />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(c) => c.id}
            numColumns={3}
            columnWrapperStyle={{ gap: theme.spacing[2], marginBottom: theme.spacing[2] }}
            contentContainerStyle={{ paddingBottom: theme.spacing[10] }}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <CategoryCard
                  category={item}
                  onPress={() => router.push(`/category/${item.id}`)}
                />
              </View>
            )}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
