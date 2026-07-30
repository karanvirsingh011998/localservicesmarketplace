import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Card, useToast } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

export default function Availability() {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();
  const [online, setOnline] = useState(true);
  const [days, setDays] = useState({ Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false });

  return (
    <Screen title="Availability" onBack>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text variant="title">Accepting jobs</Text>
            <Text variant="caption" muted>
              Appear in nearby search when online
            </Text>
          </View>
          <Switch value={online} onValueChange={setOnline} accessibilityLabel="Accepting jobs" />
        </View>
      </Card>
      <Text variant="subtitle">Working days</Text>
      {Object.entries(days).map(([day, on]) => (
        <Card key={day} elevated={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text variant="body" style={{ flex: 1 }}>
              {day}
            </Text>
            <Switch
              value={on}
              onValueChange={(v) => setDays((d) => ({ ...d, [day]: v }))}
              accessibilityLabel={`${day} availability`}
            />
          </View>
        </Card>
      ))}
      <Text variant="caption" muted>
        Service radius: 10 KM (mock)
      </Text>
      <Button
        title="Save"
        onPress={() => {
          toast.show('Availability saved (mock)');
          router.back();
        }}
      />
    </Screen>
  );
}
