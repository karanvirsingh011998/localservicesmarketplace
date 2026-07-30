import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { BOOKING_STEPS, services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

const methods = ['Cash', 'UPI (mock)', 'Card (mock)'];

export default function Payment() {
  const [method, setMethod] = useState(methods[0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const draft = useAppStore((s) => s.bookingDraft);
  const service = services.find((s) => s.id === draft.serviceId) || services[0];

  return (
    <Screen
      title="Payment"
      subtitle="Mock checkout — no real charges"
      onBack
      footer={
        <Button
          title="Review & confirm"
          loading={loading}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.replace('/booking/confirmation');
            }, 500);
          }}
        />
      }
    >
      <StepIndicator steps={[...BOOKING_STEPS]} current={4} />
      <Text variant="body" muted>
        Choose a payment method for this demo.
      </Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {methods.map((m) => (
          <Chip key={m} label={m} selected={method === m} onPress={() => setMethod(m)} />
        ))}
      </View>
      <Text variant="caption" muted>
        Amount payable
      </Text>
      <Text variant="h2">₹{service.priceFrom}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
