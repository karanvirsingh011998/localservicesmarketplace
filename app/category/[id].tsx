import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, ServiceCard, EmptyState } from '@/components';
import { categories, subcategories, services } from '@/mocks/data';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export default function CategoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const category = categories.find((c) => c.id === id);
  const subs = subcategories.filter((s) => s.categoryId === id);
  const svcs = services.filter((s) => s.categoryId === id);

  if (!category) {
    return (
      <Screen title="Category" onBack>
        <EmptyState title="Category not found" actionLabel="Browse all" onAction={() => router.push('/(guest)/categories')} />
      </Screen>
    );
  }

  return (
    <Screen title={category.name} onBack>
      <Text variant="subtitle">Services in this category</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {subs.map((s) => (
          <Chip
            key={s.id}
            label={s.name}
            onPress={() => router.push({ pathname: '/service', params: { subcategoryId: s.id } })}
          />
        ))}
      </View>
      {svcs.length === 0 ? (
        <EmptyState
          title="Demo services coming soon"
          subtitle="Browse related providers meanwhile."
          actionLabel="Browse providers"
          onAction={() => router.push('/providers')}
        />
      ) : (
        svcs.map((s) => (
          <ServiceCard key={s.id} service={s} onPress={() => router.push(`/service/${s.id}`)} />
        ))
      )}
      <Button title="Browse providers" variant="secondary" onPress={() => router.push('/providers')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
