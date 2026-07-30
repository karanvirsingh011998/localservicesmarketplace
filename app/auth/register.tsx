import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text, OtpInput, useToast } from '@/components';
import { useAppStore } from '@/store/app-store';

export function RegisterScreen() {
  const router = useRouter();
  const setRole = useAppStore((s) => s.setRole);
  const role = useAppStore((s) => s.role);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  return (
    <Screen title="Create account" onBack keyboard>
      <TextField label="Full name" value={name} onChangeText={setName} textContentType="name" />
      <TextField
        label="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
      />
      <TextField
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="newPassword"
      />
      <TextField
        label="Phone"
        keyboardType="phone-pad"
        placeholder="+91"
        value={phone}
        onChangeText={setPhone}
        textContentType="telephoneNumber"
      />
      {error ? <Text tone="destructive">{error}</Text> : null}
      <Button
        title="Continue"
        onPress={() => {
          if (!name.trim() || !email.includes('@') || password.length < 4) {
            setError('Please fill name, valid email, and password (min 4).');
            return;
          }
          if (role !== 'provider') setRole('customer');
          router.push('/auth/otp');
        }}
      />
      <Text variant="caption" muted style={{ textAlign: 'center' }}>
        By continuing you agree to{' '}
        <Text
          variant="caption"
          tone="primary"
          onPress={() => router.push('/shared/terms')}
          accessibilityRole="link"
        >
          Terms
        </Text>{' '}
        &{' '}
        <Text
          variant="caption"
          tone="primary"
          onPress={() => router.push('/shared/privacy')}
          accessibilityRole="link"
        >
          Privacy
        </Text>
        .
      </Text>
      <Button title="Already have an account" variant="ghost" onPress={() => router.push('/auth/login')} />
    </Screen>
  );
}

export default RegisterScreen;
