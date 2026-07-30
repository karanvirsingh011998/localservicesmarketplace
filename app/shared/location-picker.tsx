import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Chip } from '@/components';
import { useAppStore } from '@/store/app-store';
import { View, StyleSheet } from 'react-native';

const cities = ['Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi'];

export default function LocationPicker() {
  const [pin, setPin] = useState('560034');
  const setLocationLabel = useAppStore((s) => s.setLocationLabel);
  const router = useRouter();
  return (
    <Screen title="Choose location" onBack>
      <Button title="Use current GPS (mock)" onPress={() => { setLocationLabel('Current location'); router.back(); }} />
      <TextField label="PIN code" value={pin} onChangeText={setPin} keyboardType="number-pad" />
      <View style={styles.row}>
        {cities.map((c) => (
          <Chip key={c} label={c} onPress={() => { setLocationLabel(`${c}`); router.back(); }} />
        ))}
      </View>
      <Button title="Save PIN area" onPress={() => { setLocationLabel(`PIN ${pin}`); router.back(); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
