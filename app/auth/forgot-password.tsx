import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button, useToast } from '@/components';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Forgot password" onBack keyboard>
      <Text variant="body" muted>
        Enter your email to receive a reset link (mock).
      </Text>
      <TextField
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
        error={error}
      />
      <Button
        title="Send reset link"
        onPress={() => {
          if (!email.includes('@')) {
            setError('Enter a valid email address.');
            return;
          }
          setError('');
          toast.show('Reset link sent');
          router.push('/auth/reset-password');
        }}
      />
    </Screen>
  );
}
