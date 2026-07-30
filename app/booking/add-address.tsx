import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function AddAddress() {
  const router = useRouter();
  const toast = useToast();
  const [label, setLabel] = useState('Home');
  return (
    <Screen title="Add address" onBack>
      <TextField label="Label" value={label} onChangeText={setLabel} />
      <TextField label="Address line" placeholder="House / street" />
      <TextField label="City" placeholder="Bengaluru" />
      <TextField label="PIN code" keyboardType="number-pad" />
      <Button title="Save" onPress={() => { toast.show('Address saved (mock)'); router.back(); }} />
      <Button title="Pick on map" variant="ghost" onPress={() => router.push('/shared/location-picker')} />
    </Screen>
  );
}
