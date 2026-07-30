import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, useToast } from '@/components';

export default function ResetPassword() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Reset password" onBack keyboard>
      <TextField label="New password" secureTextEntry value={a} onChangeText={setA} textContentType="newPassword" />
      <TextField
        label="Confirm password"
        secureTextEntry
        value={b}
        onChangeText={setB}
        error={error}
        textContentType="newPassword"
      />
      <Button
        title="Update password"
        onPress={() => {
          if (a.length < 4) {
            setError('Password must be at least 4 characters.');
            return;
          }
          if (a !== b) {
            setError('Passwords do not match.');
            return;
          }
          setError('');
          toast.show('Password updated');
          router.replace('/auth/login');
        }}
      />
    </Screen>
  );
}
