import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Edit profile" onBack>
      <Text variant="body" muted>Update bio, skills, and cover photo.</Text>

    </Screen>
  );
}
