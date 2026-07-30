import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const faqs = [
  ['How do I book?', 'Choose a service, pick date/time, confirm payment (mock).'],
  ['Can I cancel?', 'Yes — open booking details and tap Cancel.'],
  ['Is this connected to a backend?', 'No. This build is UI-only with mock data.'],
];

export default function FAQ() {
  const theme = useTheme();
  return (
    <Screen title="FAQ" onBack>
      {faqs.map(([q, a]) => (
        <View key={q} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{q}</Text>
          <Text variant="body" muted>{a}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 6 } });
