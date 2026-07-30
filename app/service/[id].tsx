import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Rating, Badge } from '@/components';
import { services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

export default function ServiceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((s) => s.id === id) || services[0];
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <Screen title="Service details" onBack>
      <Image source={{ uri: service.image }} style={styles.hero} />
      <Text variant="h3">{service.name}</Text>
      {service.emergency ? <Badge label="Emergency" tone="danger" /> : null}
      <Rating value={service.rating} />
      <Text variant="body" muted>{service.description}</Text>
      <Text variant="title">from ₹{service.priceFrom} · {service.durationMins} mins</Text>
      <Button
        title="Book now"
        onPress={() => {
          patch({ serviceId: service.id });
          if (!isAuthenticated) router.push('/auth/login');
          else router.push('/booking/date');
        }}
      />
      <Button title="View providers" variant="secondary" onPress={() => router.push('/providers')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ hero: { width: '100%', height: 200, borderRadius: 16 } });
