import React from 'react';
import { Screen, Text, Button, Card, ListRow } from '@/components';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';

export default function Rewards() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Rewards" onBack>
      <Card
        style={{
          backgroundColor: theme.colors.primary,
          gap: theme.spacing[2],
        }}
      >
        <Text variant="caption" color={theme.colors.primaryForeground}>
          Available points
        </Text>
        <Text variant="display" color={theme.colors.primaryForeground}>
          420
        </Text>
      </Card>
      <Text variant="body" muted>
        Earn points on completed bookings. Redeem on your next visit (mock).
      </Text>
      <ListRow title="Refer & earn" subtitle="Invite friends for bonus points" icon="gift-outline" onPress={() => router.push('/refer')} />
      <Button title="Browse services" variant="secondary" onPress={() => router.push('/service')} />
    </Screen>
  );
}
