import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { useToast } from '@/components';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];
const methods = ['Cash', 'UPI (mock)', 'Card (mock)'];

export default function Payment() {
  const [method, setMethod] = useState(methods[0]);
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Payment" subtitle="Mock checkout — no real charges" onBack>
      <StepIndicator steps={steps} current={4} />
      <Text variant="body" muted>Choose a payment method for this demo.</Text>
      <View style={styles.row}>
        {methods.map((m) => (
          <Chip key={m} label={m} selected={method === m} onPress={() => setMethod(m)} />
        ))}
      </View>
      <Text variant="h3">₹499</Text>
      <Button
        title="Pay & confirm"
        onPress={() => {
          toast.show('Payment successful (mock)');
          router.replace('/booking/confirmation');
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
