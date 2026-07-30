import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function Register() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setRole = useAppStore((s) => s.setRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Screen title="Create account" onBack>
      <TextField label="Full name" value={name} onChangeText={setName} />
      <TextField label="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextField label="Password" secureTextEntry />
      <TextField label="Phone" keyboardType="phone-pad" placeholder="+91" />
      <Button
        title="Continue"
        onPress={() => {
          setRole('customer');
          router.push('/auth/otp');
        }}
      />
      <Text variant="caption" muted style={{ textAlign: 'center' }}>
        By continuing you agree to Terms & Privacy (UI only).
      </Text>
      <Button title="Already have an account" variant="ghost" onPress={() => router.push('/auth/login')} />
    </Screen>
  );
}
