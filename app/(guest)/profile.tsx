import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, ListRow, Button, Modal } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function GuestProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <Screen title="Profile" onBack={false}>
      <Text variant="body" muted>
        Browsing as guest. Sign in to book and chat.
      </Text>
      <Button title="Sign in" onPress={() => router.push('/auth/login')} />
      <Button title="Create account" variant="secondary" onPress={() => router.push('/auth/register')} />
      <ListRow title="Choose role" icon="swap-horizontal-outline" onPress={() => router.push('/select-role')} />
      <ListRow title="Help & support" icon="help-circle-outline" onPress={() => router.push('/shared/help')} />
      <ListRow title="About" icon="information-circle-outline" onPress={() => router.push('/shared/about')} />
      <ListRow title="Privacy" icon="shield-outline" onPress={() => router.push('/shared/privacy')} />
      <ListRow title="Terms" icon="document-text-outline" onPress={() => router.push('/shared/terms')} />
      <Button title="Reset demo state" variant="destructive" onPress={() => setResetOpen(true)} />
      <Modal visible={resetOpen} title="Reset demo?" onClose={() => setResetOpen(false)}>
        <Text muted>This returns you to the welcome flow.</Text>
        <Button
          title="Reset"
          variant="destructive"
          onPress={() => {
            setResetOpen(false);
            signOut();
            router.replace('/welcome');
          }}
        />
        <Button title="Cancel" variant="ghost" onPress={() => setResetOpen(false)} />
      </Modal>
    </Screen>
  );
}
