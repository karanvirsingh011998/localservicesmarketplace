import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function GuestProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  return (
    <Screen title="Profile" onBack={false}>
      <Text variant="body" muted>Browsing as guest. Sign in to book and chat.</Text>
      <Button title="Sign in" onPress={() => router.push('/auth/login')} />
      <Button title="Create account" variant="secondary" onPress={() => router.push('/auth/register')} />
      <Divider />
      <Button title="Choose role" variant="ghost" onPress={() => router.push('/select-role')} />
      <Button title="Help & support" variant="ghost" onPress={() => router.push('/shared/help')} />
      <Button title="About" variant="ghost" onPress={() => router.push('/shared/about')} />
      <Button title="Privacy" variant="ghost" onPress={() => router.push('/shared/privacy')} />
      <Button title="Terms" variant="ghost" onPress={() => router.push('/shared/terms')} />
      <Button title="Reset demo state" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
