import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

export default function Welcome() {
  const router = useRouter();
  const theme = useTheme();
  const setRole = useAppStore((s) => s.setRole);

  return (
    <Screen scroll={false} padded={false} edges={['top', 'bottom']}>
      <LinearGradient colors={[theme.colors.primary, '#0B1220']} style={styles.hero}>
        <Text variant="display" color={theme.colors.primaryForeground}>
          QuickFix
        </Text>
        <Text variant="subtitle" color={theme.colors.primaryForeground}>
          Home services marketplace
        </Text>
      </LinearGradient>
      <View style={[styles.actions, { padding: theme.spacing[6], gap: theme.spacing[3] }]}>
        <Button
          title="Continue as guest"
          onPress={() => {
            setRole('guest');
            router.replace('/(guest)');
          }}
        />
        <Button title="Sign in" variant="secondary" onPress={() => router.push('/auth/login')} />
        <Button title="Create account" variant="ghost" onPress={() => router.push('/auth/register')} />
        <Button title="Choose role" variant="ghost" onPress={() => router.push('/select-role')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  actions: {},
});
