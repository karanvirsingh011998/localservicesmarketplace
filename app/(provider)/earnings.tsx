import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const rows = [
  ['AC Full Service', '+₹699', 'Today'],
  ['Pipe Leak Repair', '+₹499', 'Yesterday'],
  ['Wiring Check', '+₹499', 'Mon'],
];

export default function Earnings() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Earnings" subtitle="This week ₹12,450" onBack={false}>
      <View style={[styles.hero, { backgroundColor: theme.colors.primary, borderRadius: theme.radius.xl }]}>
        <Text variant="caption" color="#fff">Available balance</Text>
        <Text variant="display" color="#fff">₹8,240</Text>
      </View>
      {rows.map(([n, a, d]) => (
        <View key={n} style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <View>
            <Text variant="title">{n}</Text>
            <Text variant="caption" muted>{d}</Text>
          </View>
          <Text variant="subtitle" color={theme.colors.success}>{a}</Text>
        </View>
      ))}
      <Button title="Transaction history" onPress={() => router.push('/provider/transactions')} />
      <Button title="Analytics" variant="secondary" onPress={() => router.push('/provider/analytics')} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { padding: 24, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});
