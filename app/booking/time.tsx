import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button, StepIndicator } from '@/components';
import { timeSlots } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectTime() {
  const [time, setTime] = useState(timeSlots[2]);
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select time" onBack>
      <StepIndicator steps={steps} current={1} />
      <View style={styles.row}>
        {timeSlots.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Button title="Continue" onPress={() => { patch({ time }); router.push('/booking/address'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
