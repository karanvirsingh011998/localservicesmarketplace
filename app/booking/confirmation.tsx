import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function Confirmation() {
  const router = useRouter();
  const draft = useAppStore((s) => s.bookingDraft);
  return (
    <Screen title="Confirm booking" onBack>
      <Text variant="h3">Almost done</Text>
      <Text variant="body" muted>
        {draft.date} at {draft.time}. Tap confirm to finish.
      </Text>
      <Button title="Confirm" onPress={() => router.replace('/booking/success')} />
    </Screen>
  );
}
