import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Avatar, Divider, ListRow, Button, Modal } from '@/components';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function CustomerProfile() {
  const router = useRouter();
  const theme = useTheme();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Demo Customer" uri="https://i.pravatar.cc/150?u=customer" size={72} />
      <Text variant="h4">Demo Customer</Text>
      <Text variant="caption" muted>
        demo@quickfix.app
      </Text>
      <Divider />
      <Text variant="subtitle">Account</Text>
      <ListRow title="Edit profile" icon="person-outline" onPress={() => router.push('/profile/edit')} />
      <ListRow title="Notifications" icon="notifications-outline" onPress={() => router.push('/notifications')} />
      <ListRow title="Favorites" icon="heart-outline" onPress={() => router.push('/favorites')} />
      <ListRow title="Saved addresses" icon="location-outline" onPress={() => router.push('/addresses')} />
      <Text variant="subtitle">Money & rewards</Text>
      <ListRow title="Coupons" icon="pricetag-outline" onPress={() => router.push('/coupons')} />
      <ListRow title="Rewards" icon="star-outline" onPress={() => router.push('/rewards')} />
      <ListRow title="Refer & earn" icon="gift-outline" onPress={() => router.push('/refer')} />
      <Text variant="subtitle">Support</Text>
      <ListRow title="Settings" icon="settings-outline" onPress={() => router.push('/profile/settings')} />
      <ListRow title="Help & support" icon="help-circle-outline" onPress={() => router.push('/shared/help')} />
      <Divider />
      <Button
        title="Switch to provider demo"
        variant="secondary"
        onPress={() => {
          setRole('provider');
          router.replace('/(provider)');
        }}
      />
      <Button title="Sign out" variant="destructive" onPress={() => setConfirm(true)} />
      <Modal visible={confirm} title="Sign out?" onClose={() => setConfirm(false)}>
        <Text muted>You can sign back in anytime with the demo accounts.</Text>
        <Button
          title="Sign out"
          variant="destructive"
          onPress={() => {
            setConfirm(false);
            signOut();
            router.replace('/welcome');
          }}
        />
        <Button title="Cancel" variant="ghost" onPress={() => setConfirm(false)} />
      </Modal>
    </Screen>
  );
}
