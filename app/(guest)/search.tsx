import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Chip, Button } from '@/components';
import { recentSearches, trendingSearches, categories, subcategories } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Search() {
  const [q, setQ] = useState('');
  const router = useRouter();
  const theme = useTheme();

  const suggestions = q.trim()
    ? [
        ...categories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())).slice(0, 4).map((c) => c.name),
        ...subcategories.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())).slice(0, 4).map((s) => s.name),
      ]
    : [];

  const go = (query: string) =>
    router.push({ pathname: '/search/results', params: { q: query } });

  return (
    <Screen title="Search" onBack={false} keyboard>
      <TextField
        placeholder="Services, providers, PIN…"
        value={q}
        onChangeText={setQ}
        onSubmitEditing={() => go(q)}
        autoFocus
        returnKeyType="search"
        accessibilityLabel="Search query"
      />
      <Button title="Search" onPress={() => go(q)} />
      {suggestions.length > 0 ? (
        <>
          <Text variant="subtitle">Suggestions</Text>
          <View style={[styles.row, { gap: theme.spacing[2] }]}>
            {suggestions.map((s) => (
              <Chip key={s} label={s} onPress={() => go(s)} />
            ))}
          </View>
        </>
      ) : null}
      <Text variant="subtitle">Recent</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {recentSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => go(s)} />
        ))}
      </View>
      <Text variant="subtitle">Trending</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {trendingSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => go(s)} />
        ))}
      </View>
      <Pressable onPress={() => router.push('/shared/filters')} accessibilityRole="button">
        <Text tone="primary">Open filters</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
