import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, useToast } from '@/components';

export default function AddAddress() {
  const router = useRouter();
  const toast = useToast();
  const [label, setLabel] = useState('Home');
  const [line, setLine] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  return (
    <Screen title="Add address" onBack keyboard>
      <TextField label="Label" value={label} onChangeText={setLabel} />
      <TextField label="Address line" placeholder="House / street" value={line} onChangeText={setLine} />
      <TextField label="City" value={city} onChangeText={setCity} />
      <TextField
        label="PIN code"
        keyboardType="number-pad"
        value={pin}
        onChangeText={setPin}
        maxLength={6}
        error={error}
      />
      <Button
        title="Save"
        onPress={() => {
          if (!line.trim() || pin.length !== 6) {
            setError('Enter address and a 6-digit PIN.');
            return;
          }
          setError('');
          toast.show('Address saved (mock)');
          router.back();
        }}
      />
      <Button title="Pick on map" variant="ghost" onPress={() => router.push('/shared/location-picker')} />
    </Screen>
  );
}
