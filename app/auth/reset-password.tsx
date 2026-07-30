import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function ResetPassword() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Reset password" onBack>
      <TextField label="New password" secureTextEntry value={a} onChangeText={setA} />
      <TextField label="Confirm password" secureTextEntry value={b} onChangeText={setB} />
      <Button title="Update password" onPress={() => { toast.show('Password updated'); router.replace('/auth/login'); }} />
    </Screen>
  );
}
