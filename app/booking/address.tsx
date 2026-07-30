import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, StepIndicator } from '@/components';
import { addresses } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectAddress() {
  const [id, setId] = useState(addresses[0].id);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select address" onBack>
      <StepIndicator steps={steps} current={2} />
      {addresses.map((a) => (
        <Pressable
          key={a.id}
          onPress={() => setId(a.id)}
          style={[styles.card, {
            borderColor: id === a.id ? theme.colors.primary : theme.colors.border,
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.lg,
          }]}
        >
          <Text variant="title">{a.label}</Text>
          <Text variant="caption" muted>{a.line1}, {a.city} {a.pin}</Text>
        </Pressable>
      ))}
      <Button title="Add address" variant="secondary" onPress={() => router.push('/booking/add-address')} />
      <Button title="Continue" onPress={() => { patch({ addressId: id }); router.push('/booking/summary'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, borderWidth: 2, gap: 4 } });
