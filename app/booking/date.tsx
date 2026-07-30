import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { useAppStore } from '@/store/app-store';

const dates = ['Thu 30', 'Fri 31', 'Sat 1', 'Sun 2', 'Mon 3'];
const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectDate() {
  const [date, setDate] = useState(dates[0]);
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select date" onBack>
      <StepIndicator steps={steps} current={0} />
      <View style={styles.row}>
        {dates.map((d) => (
          <Chip key={d} label={d} selected={date === d} onPress={() => setDate(d)} />
        ))}
      </View>
      <Button title="Continue" onPress={() => { patch({ date }); router.push('/booking/time'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
