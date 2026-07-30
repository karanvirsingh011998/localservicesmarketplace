import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Chip, Button } from '@/components';
import { recentSearches, trendingSearches } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function SearchIndex() {
  const [q, setQ] = useState('');
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Search" onBack>
      <TextField
        placeholder="Services, providers, PIN…"
        value={q}
        onChangeText={setQ}
        onSubmitEditing={() => router.push({ pathname: '/search/results', params: { q } })}
        autoFocus
        accessibilityLabel="Search query"
      />
      <Button title="Search" onPress={() => router.push({ pathname: '/search/results', params: { q } })} />
      <Text variant="subtitle">Recent</Text>
      <View style={styles.row}>
        {recentSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => router.push({ pathname: '/search/results', params: { q: s } })} />
        ))}
      </View>
      <Text variant="subtitle">Trending</Text>
      <View style={styles.row}>
        {trendingSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => router.push({ pathname: '/search/results', params: { q: s } })} />
        ))}
      </View>
      <Pressable onPress={() => router.push('/shared/filters')} accessibilityRole="button">
        <Text color={theme.colors.primary}>Open filters</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
