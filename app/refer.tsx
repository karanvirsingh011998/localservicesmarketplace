import React from 'react';
import { Screen, Text, Button, Card, useToast } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

export default function Refer() {
  const toast = useToast();
  const theme = useTheme();
  return (
    <Screen title="Refer & earn" onBack>
      <Text variant="h3">Invite friends</Text>
      <Text variant="body" muted>
        Share code QUICKFIX50 — both get ₹50 credit (mock).
      </Text>
      <Card>
        <Text variant="caption" muted>
          Your invite code
        </Text>
        <Text variant="h2">QUICKFIX50</Text>
      </Card>
      <Button title="Copy invite code" onPress={() => toast.show('Code copied (mock)')} />
      <Button title="Share link" variant="secondary" onPress={() => toast.show('Share sheet (mock)')} />
    </Screen>
  );
}
