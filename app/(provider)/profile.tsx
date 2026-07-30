import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Avatar, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

const links = [
  ['Provider profile', '/provider/profile-view'],
  ['Edit profile', '/provider/edit-profile'],
  ['My services', '/provider/services'],
  ['Availability', '/provider/availability'],
  ['Calendar', '/provider/calendar'],
  ['Portfolio', '/provider/portfolio'],
  ['Upload documents', '/provider/documents'],
  ['Customer reviews', '/provider/reviews'],
  ['Notifications', '/provider/notifications'],
  ['Settings', '/provider/settings'],
];

export default function ProviderProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Ravi Kumar" uri="https://i.pravatar.cc/150?u=p1" size={72} />
      <Text variant="h4">Ravi Kumar</Text>
      <Text variant="caption" muted>Verified provider</Text>
      <Divider />
      {links.map(([label, href]) => (
        <Button key={href} title={label} variant="ghost" onPress={() => router.push(href as any)} />
      ))}
      <Button title="Switch to customer demo" variant="secondary" onPress={() => { setRole('customer'); router.replace('/(customer)'); }} />
      <Button title="Sign out" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
