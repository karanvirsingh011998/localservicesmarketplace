import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Rating, Badge, EmptyState } from '@/components';
import { services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function ServiceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((s) => s.id === id);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (!service) {
    return (
      <Screen title="Service" onBack>
        <EmptyState title="Service not found" />
      </Screen>
    );
  }

  return (
    <Screen
      title={service.name}
      onBack
      footer={
        <Button
          title="Book now"
          onPress={() => {
            patch({ serviceId: service.id });
            if (!isAuthenticated) router.push('/auth/login');
            else router.push('/booking/date');
          }}
        />
      }
    >
      <Image
        source={{ uri: service.image }}
        style={[styles.hero, { borderRadius: theme.radius.lg, backgroundColor: theme.colors.muted }]}
        accessibilityLabel={`${service.name} image`}
      />
      {service.emergency ? <Badge label="Emergency" tone="danger" /> : null}
      <Rating value={service.rating} />
      <Text variant="body" muted>
        {service.description}
      </Text>
      <Text variant="title">
        from ₹{service.priceFrom} · {service.durationMins} mins
      </Text>
      <Button title="View providers" variant="secondary" onPress={() => router.push('/providers')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 200 },
});
