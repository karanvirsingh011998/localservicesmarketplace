import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button, StepIndicator } from '@/components';
import { BOOKING_STEPS } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

function buildDates() {
  const out: { label: string; value: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      label: d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }),
      value: d.toISOString().slice(0, 10),
    });
  }
  return out;
}

export default function SelectDate() {
  const dates = useMemo(buildDates, []);
  const [date, setDate] = useState(dates[0]);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);

  return (
    <Screen
      title="Select date"
      onBack
      footer={
        <Button
          title="Continue"
          onPress={() => {
            patch({ date: date.label });
            router.push('/booking/time');
          }}
        />
      }
    >
      <StepIndicator steps={[...BOOKING_STEPS]} current={0} />
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {dates.map((d) => (
          <Chip
            key={d.value}
            label={d.label}
            selected={date.value === d.value}
            onPress={() => setDate(d)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
