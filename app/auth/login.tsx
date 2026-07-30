import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Screen,
  Text,
  TextField,
  Button,
  Divider,
  Modal,
} from '@/components';
import { useAppStore, type AppRole } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function Login() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams<{ role?: string }>();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setRole = useAppStore((s) => s.setRole);
  const storeRole = useAppStore((s) => s.role);
  const [email, setEmail] = useState('demo@quickfix.app');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const finish = (role: AppRole) => {
    setLoading(true);
    setTimeout(() => {
      setRole(role);
      setAuthenticated(true);
      setLoading(false);
      router.replace(role === 'provider' ? '/(provider)' : '/(customer)');
    }, 400);
  };

  const signIn = () => {
    if (!email.includes('@') || password.length < 4) {
      setError('Enter a valid email and password (min 4 characters).');
      return;
    }
    setError('');
    const role = (params.role as AppRole) || (storeRole === 'provider' ? 'provider' : 'customer');
    finish(role === 'guest' ? 'customer' : role);
  };

  return (
    <Screen title="Sign in" subtitle="UI demo — any credentials work" onBack keyboard>
      <TextField
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        error={error && !email.includes('@') ? error : undefined}
      />
      <TextField
        label="Password"
        secureTextEntry={!showPassword}
        textContentType="password"
        autoComplete="password"
        value={password}
        onChangeText={setPassword}
        error={error && password.length < 4 ? error : undefined}
      />
      <Pressable onPress={() => setShowPassword((v) => !v)} accessibilityRole="button">
        <Text variant="caption" tone="primary">
          {showPassword ? 'Hide password' : 'Show password'}
        </Text>
      </Pressable>
      {error ? (
        <Text tone="destructive" variant="caption">
          {error}
        </Text>
      ) : null}
      <Button title="Sign in" loading={loading} onPress={signIn} />
      <Button title="Verify with OTP" variant="secondary" onPress={() => {
        const role = (params.role as AppRole) || storeRole;
        if (role === 'provider' || role === 'customer') setRole(role);
        router.push('/auth/otp');
      }} />
      <Pressable
        onPress={() => router.push('/auth/forgot-password')}
        accessibilityRole="link"
        style={{ paddingVertical: theme.spacing[2], minHeight: theme.sizes.touch, justifyContent: 'center' }}
      >
        <Text variant="caption" muted style={{ textAlign: 'center' }}>
          Forgot password?
        </Text>
      </Pressable>
      <Button title="Create account" variant="ghost" onPress={() => router.push('/auth/register')} />
      <Divider />
      <Button title="Demo accounts" variant="ghost" onPress={() => setDemoOpen(true)} />
      <Modal visible={demoOpen} title="Demo accounts" onClose={() => setDemoOpen(false)}>
        <Text variant="body" muted>
          Jump into a polished role preview with mock data.
        </Text>
        <Button title="Customer demo" onPress={() => { setDemoOpen(false); finish('customer'); }} />
        <Button title="Provider demo" variant="secondary" onPress={() => { setDemoOpen(false); finish('provider'); }} />
      </Modal>
    </Screen>
  );
}
