import React from 'react';
import { View } from 'react-native';
import { Screen, Text, Card, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useRouter } from 'expo-router';

const points = [40, 65, 50, 80, 72, 90, 68];

export default function Analytics() {
  const theme = useTheme();
  const router = useRouter();
  const max = Math.max(...points);
  return (
    <Screen title="Analytics" subtitle="Last 7 days (mock)" onBack>
      <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
        {[
          ['28', 'Jobs'],
          ['92%', 'Acceptance'],
          ['4.9', 'Rating'],
        ].map(([v, l]) => (
          <Card key={l} style={{ flex: 1 }}>
            <Text variant="h3">{v}</Text>
            <Text variant="caption" muted>
              {l}
            </Text>
          </Card>
        ))}
      </View>
      <Text variant="subtitle">Weekly jobs</Text>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {points.map((p, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: (p / max) * 100,
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.sm,
                opacity: 0.85,
              }}
              accessibilityLabel={`Day ${i + 1}: ${p} jobs`}
            />
          ))}
        </View>
      </Card>
      <Button title="Back to earnings" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}
