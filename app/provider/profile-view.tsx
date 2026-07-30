import React from 'react';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Rating, Badge, Avatar } from '@/components';
import { providers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderProfileView() {
  const p = providers[0];
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Public preview" onBack>
      <Image source={{ uri: p.cover }} style={{ width: '100%', height: 140, borderRadius: theme.radius.lg }} accessibilityLabel="Cover photo" />
      <Avatar uri={p.avatar} name={p.name} size={64} />
      <Text variant="h4">{p.name}</Text>
      <Badge label="Verified" tone="success" />
      <Rating value={p.rating} />
      <Text variant="body" muted>{p.bio}</Text>
      <Button title="Edit profile" onPress={() => router.push('/provider/edit-profile')} />
    </Screen>
  );
}
