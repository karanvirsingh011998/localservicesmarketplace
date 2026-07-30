import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { addresses } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Addresses() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Saved addresses" onBack>
      {addresses.map((a) => (
        <View key={a.id} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{a.label}</Text>
          <Text variant="caption" muted>{a.line1}, {a.city} {a.pin}</Text>
        </View>
      ))}
      <Button title="Add address" onPress={() => router.push('/booking/add-address')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 4 } });
