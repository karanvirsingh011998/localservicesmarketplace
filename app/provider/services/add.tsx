import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function AddService() {
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Add service" onBack>
      <TextField label="Service name" />
      <TextField label="Price from" keyboardType="number-pad" />
      <TextField label="Duration (mins)" keyboardType="number-pad" />
      <TextField label="Description" multiline />
      <Button title="Save" onPress={() => { toast.show('Service added'); router.back(); }} />
    </Screen>
  );
}
