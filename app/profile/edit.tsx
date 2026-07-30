import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function EditProfile() {
  const [name, setName] = useState('Demo Customer');
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Edit profile" onBack>
      <TextField label="Full name" value={name} onChangeText={setName} />
      <TextField label="Email" value="demo@quickfix.app" />
      <TextField label="Phone" value="+91 98765 43210" />
      <Button title="Save" onPress={() => { toast.show('Profile updated'); router.back(); }} />
    </Screen>
  );
}
