import React from 'react';
import { Screen, Text } from '@/components';

export default function Privacy() {
  return (
    <Screen title="Privacy Policy" onBack>
      <Text variant="body" muted>
        This is placeholder privacy copy for the QuickFix UI demo. No personal data is transmitted to a backend in this build. Preferences are stored on-device via AsyncStorage.
      </Text>
    </Screen>
  );
}
