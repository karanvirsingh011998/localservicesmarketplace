import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Avatar, Divider, ListRow, Button, Modal } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function ProviderProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Ravi Kumar" uri="https://i.pravatar.cc/150?u=p1" size={72} />
      <Text variant="h4">Ravi Kumar</Text>
      <Text variant="caption" muted>
        Verified provider
      </Text>
      <Divider />
      <Text variant="subtitle">Business</Text>
      <ListRow title="Provider profile" icon="person-outline" onPress={() => router.push('/provider/profile-view')} />
      <ListRow title="Edit profile" icon="create-outline" onPress={() => router.push('/provider/edit-profile')} />
      <ListRow title="My services" icon="construct-outline" onPress={() => router.push('/provider/services')} />
      <ListRow title="Availability" icon="time-outline" onPress={() => router.push('/provider/availability')} />
      <ListRow title="Calendar" icon="calendar-outline" onPress={() => router.push('/provider/calendar')} />
      <ListRow title="Portfolio" icon="images-outline" onPress={() => router.push('/provider/portfolio')} />
      <ListRow title="Documents" icon="document-outline" onPress={() => router.push('/provider/documents')} />
      <ListRow title="Customer reviews" icon="star-outline" onPress={() => router.push('/provider/reviews')} />
      <Text variant="subtitle">Account</Text>
      <ListRow title="Notifications" icon="notifications-outline" onPress={() => router.push('/provider/notifications')} />
      <ListRow title="Settings" icon="settings-outline" onPress={() => router.push('/provider/settings')} />
      <Divider />
      <Button
        title="Switch to customer demo"
        variant="secondary"
        onPress={() => {
          setRole('customer');
          router.replace('/(customer)');
        }}
      />
      <Button title="Sign out" variant="destructive" onPress={() => setConfirm(true)} />
      <Modal visible={confirm} title="Sign out?" onClose={() => setConfirm(false)}>
        <Text muted>Return to the welcome screen?</Text>
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
