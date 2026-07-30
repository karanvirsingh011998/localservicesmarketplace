import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const filters = [
  'Distance',
  'Rating 4+',
  'Price',
  'Availability',
  'Emergency',
  'Verified',
  'Experience',
  'Offers',
];

export default function Filters() {
  const [selected, setSelected] = useState(['Distance']);
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen
      title="Filters"
      onBack
      footer={<Button title="Apply" onPress={() => router.back()} />}
    >
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {filters.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={selected.includes(f)}
            onPress={() =>
              setSelected((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))
            }
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
