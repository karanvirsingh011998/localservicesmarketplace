import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Button, FloatingActionButton, Card, Text, EmptyState } from '@/components';
import { services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';
import { View } from 'react-native';

export default function MyServices() {
  const router = useRouter();
  const theme = useTheme();
  const mine = services.slice(0, 3);

  return (
    <Screen title="My services" onBack scroll={false} edges={['top']}>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing[5] }}>
        {mine.length === 0 ? (
          <EmptyState
            title="No services yet"
            actionLabel="Add service"
            onAction={() => router.push('/provider/services/add')}
          />
        ) : (
          mine.map((s) => (
            <Card
              key={s.id}
              onPress={() => router.push('/provider/services/edit')}
              accessibilityLabel={`${s.name}, from ₹${s.priceFrom}`}
              style={{ marginBottom: theme.spacing[2] }}
            >
              <Text variant="title">{s.name}</Text>
              <Text variant="caption" muted>
                from ₹{s.priceFrom} · {s.durationMins} mins
              </Text>
            </Card>
          ))
        )}
        <Button title="Add service" onPress={() => router.push('/provider/services/add')} />
      </View>
      <FloatingActionButton
        accessibilityLabel="Add service"
        onPress={() => router.push('/provider/services/add')}
      />
    </Screen>
  );
}
