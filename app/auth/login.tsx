import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, TextField, Button } from '@/components';
import { useAppStore, type AppRole } from '@/store/app-store';

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setRole = useAppStore((s) => s.setRole);
  const [email, setEmail] = useState('demo@quickfix.app');
  const [password, setPassword] = useState('demo1234');

  const finish = (role: AppRole) => {
    setRole(role);
    setAuthenticated(true);
    router.replace(role === 'provider' ? '/(provider)' : '/(customer)');
  };

  return (
    <Screen title="Sign in" subtitle="UI demo — any credentials work" onBack>
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextField label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign in" onPress={() => finish((params.role as AppRole) || 'customer')} />
      <Button title="Verify with OTP" variant="secondary" onPress={() => router.push('/auth/otp')} />
      <Pressable onPress={() => router.push('/auth/forgot-password')}>
        <Text variant="caption" muted style={{ textAlign: 'center' }}>Forgot password?</Text>
      </Pressable>
      <Button title="Create account" variant="ghost" onPress={() => router.push('/auth/register')} />
      <View style={styles.row}>
        <Button title="Customer demo" variant="secondary" style={{ flex: 1 }} onPress={() => finish('customer')} />
        <Button title="Provider demo" variant="secondary" style={{ flex: 1 }} onPress={() => finish('provider')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
});
