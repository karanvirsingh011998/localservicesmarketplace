import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button } from '@/components';

const filters = ['Distance', 'Rating 4+', 'Price', 'Availability', 'Emergency', 'Verified', 'Experience', 'Offers'];

export default function Filters() {
  const [selected, setSelected] = useState(['Distance']);
  const router = useRouter();
  return (
    <Screen title="Filters" onBack>
      <View style={styles.row}>
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
      <Button title="Apply" onPress={() => router.back()} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
