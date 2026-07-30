import React from 'react';
import { Screen, Text, ListRow } from '@/components';
import { useRouter } from 'expo-router';

export default function Help() {
  const router = useRouter();
  return (
    <Screen title="Help & Support" onBack>
      <Text variant="body" muted>Find answers or contact us (mock).</Text>
      <ListRow title="FAQ" icon="help-circle-outline" onPress={() => router.push('/shared/faq')} />
      <ListRow title="Contact us" icon="mail-outline" onPress={() => router.push('/shared/contact')} />
      <ListRow title="About" icon="information-circle-outline" onPress={() => router.push('/shared/about')} />
    </Screen>
  );
}
