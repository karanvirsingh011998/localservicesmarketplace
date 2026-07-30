import React from 'react';
import { Screen, Text } from '@/components';

export default function About() {
  return (
    <Screen title="About QuickFix" onBack>
      <Text variant="h3">QuickFix</Text>
      <Text variant="body" muted>
        A premium local services marketplace UI demo. Browse categories, book pros, chat, and manage provider jobs — all with mock data and no backend.
      </Text>
      <Text variant="caption" muted>Version 1.0.0 · UI-only</Text>
    </Screen>
  );
}
