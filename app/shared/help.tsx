import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="Help & Support" onBack>
      <Text variant="body" muted>FAQs and contact options.</Text>
      <Button title="FAQ" variant="ghost" onPress={() => router.push('/shared/faq' as any)} />
      <Button title="Contact us" variant="ghost" onPress={() => router.push('/shared/contact' as any)} />
    </Screen>
  );
}
