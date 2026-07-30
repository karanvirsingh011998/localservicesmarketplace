import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Forgot password" onBack>
      <Text variant="body" muted>Enter your email to receive a reset link (mock).</Text>
      <TextField label="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Button title="Send reset link" onPress={() => { toast.show('Reset link sent'); router.push('/auth/reset-password'); }} />
    </Screen>
  );
}
