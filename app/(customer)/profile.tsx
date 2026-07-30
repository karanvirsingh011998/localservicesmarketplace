import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Avatar, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

const links = [
  ['Edit profile', '/profile/edit'],
  ['Notifications', '/notifications'],
  ['Favorites', '/favorites'],
  ['Saved addresses', '/addresses'],
  ['Coupons', '/coupons'],
  ['Rewards', '/rewards'],
  ['Refer & earn', '/refer'],
  ['Settings', '/profile/settings'],
  ['Help & support', '/shared/help'],
];

export default function CustomerProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Demo Customer" uri="https://i.pravatar.cc/150?u=customer" size={72} />
      <Text variant="h4">Demo Customer</Text>
      <Text variant="caption" muted>demo@quickfix.app</Text>
      <Divider />
      {links.map(([label, href]) => (
        <Button key={href} title={label} variant="ghost" onPress={() => router.push(href as any)} />
      ))}
      <Button title="Switch to provider demo" variant="secondary" onPress={() => { setRole('provider'); router.replace('/(provider)'); }} />
      <Button title="Sign out" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
