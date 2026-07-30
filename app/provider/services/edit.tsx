import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function EditService() {
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Edit service" onBack>
      <TextField label="Service name" value="Pipe Leak Repair" />
      <TextField label="Price from" value="299" keyboardType="number-pad" />
      <Button title="Update" onPress={() => { toast.show('Service updated'); router.back(); }} />
    </Screen>
  );
}
