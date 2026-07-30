import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { BOOKING_STEPS, timeSlots } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function SelectTime() {
  const [time, setTime] = useState(timeSlots[2]);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const morning = timeSlots.filter((t) => t.includes('AM'));
  const afternoon = timeSlots.filter((t) => t.includes('PM'));

  return (
    <Screen
      title="Select time"
      onBack
      footer={
        <Button
          title="Continue"
          onPress={() => {
            patch({ time });
            router.push('/booking/address');
          }}
        />
      }
    >
      <StepIndicator steps={[...BOOKING_STEPS]} current={1} />
      <Text variant="subtitle">Morning</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {morning.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Text variant="subtitle">Afternoon / Evening</Text>
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {afternoon.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
