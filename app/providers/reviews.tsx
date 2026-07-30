import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Rating } from '@/components';
import { reviews } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderReviews() {
  const theme = useTheme();
  return (
    <Screen title="Reviews" onBack>
      {reviews.map((r) => (
        <View key={r.id} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{r.author}</Text>
          <Rating value={r.rating} />
          <Text variant="body">{r.text}</Text>
          <Text variant="caption" muted>{r.date}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 6 } });
