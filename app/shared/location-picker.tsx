import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Chip } from '@/components';
import { useAppStore } from '@/store/app-store';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

const cities = ['Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi'];

export default function LocationPicker() {
  const [pin, setPin] = useState('560034');
  const [error, setError] = useState('');
  const setLocationLabel = useAppStore((s) => s.setLocationLabel);
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen title="Choose location" onBack keyboard>
      <Button
        title="Use current GPS (mock)"
        onPress={() => {
          setLocationLabel('Current location');
          router.back();
        }}
      />
      <TextField
        label="PIN code"
        value={pin}
        onChangeText={setPin}
        keyboardType="number-pad"
        maxLength={6}
        error={error}
      />
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {cities.map((c) => (
          <Chip
            key={c}
            label={c}
            onPress={() => {
              setLocationLabel(c);
              router.back();
            }}
          />
        ))}
      </View>
      <Button
        title="Save PIN area"
        onPress={() => {
          if (pin.length !== 6) {
            setError('Enter a 6-digit PIN.');
            return;
          }
          setError('');
          setLocationLabel(`PIN ${pin}`);
          router.back();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
