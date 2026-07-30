import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { Screen, Text, Card, ListRow, Button } from '@/components';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderSettings() {
  const [alerts, setAlerts] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Settings" onBack>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text variant="title">Job alerts</Text>
            <Text variant="caption" muted>Notify on new requests (mock)</Text>
          </View>
          <Switch value={alerts} onValueChange={setAlerts} accessibilityLabel="Job alerts" />
        </View>
      </Card>
      <ListRow title="Appearance & brand" icon="color-palette-outline" onPress={() => router.push('/profile/settings')} />
      <ListRow title="Help" icon="help-circle-outline" onPress={() => router.push('/shared/help')} />
      <Button title="Done" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
