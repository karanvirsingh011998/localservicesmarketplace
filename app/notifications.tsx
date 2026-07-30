import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const items = [
  ['Booking accepted', 'Ravi accepted your plumbing request'],
  ['Reminder', 'AC service tomorrow at 11:00 AM'],
  ['Offer', 'WELCOME20 expires in 2 days'],
];

export default function Notifications() {
  const theme = useTheme();
  return (
    <Screen title="Notifications" onBack>
      {items.map(([t, s]) => (
        <View key={t} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{t}</Text>
          <Text variant="caption" muted>{s}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 4 } });
