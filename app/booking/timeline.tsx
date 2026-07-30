import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const events = [
  { t: '3:40 PM', l: 'Booking accepted' },
  { t: '3:55 PM', l: 'Provider en route' },
  { t: '4:05 PM', l: 'Service started' },
];

export default function Timeline() {
  const theme = useTheme();
  return (
    <Screen title="Booking timeline" onBack>
      {events.map((e) => (
        <View key={e.t} style={[styles.row, { borderLeftColor: theme.colors.primary }]}>
          <Text variant="caption" muted>{e.t}</Text>
          <Text variant="body">{e.l}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { paddingLeft: 14, borderLeftWidth: 3, marginBottom: 16, gap: 4 },
});
