import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge, Rating, Chip } from '@/components';
import { providers, galleryImages, reviews } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = providers.find((x) => x.id === id) || providers[0];
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <Screen title={p.name} onBack padded={false}>
      <Image source={{ uri: p.cover }} style={styles.cover} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Image source={{ uri: p.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, gap: 4 }}>
            <View style={styles.row}>
              <Text variant="h4">{p.name}</Text>
              {p.verified ? <Badge label="Verified" tone="success" /> : null}
            </View>
            <Text variant="caption" muted>{p.title} · {p.experienceYears} yrs · {p.jobs} jobs</Text>
            <Rating value={p.rating} />
          </View>
        </View>
        <Text variant="body">{p.bio}</Text>
        <View style={styles.row}>{p.languages.map((l) => <Chip key={l} label={l} />)}</View>
        <Text variant="h4">Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((uri) => (
            <Image key={uri} source={{ uri }} style={[styles.thumb, { borderRadius: theme.radius.md }]} />
          ))}
        </ScrollView>
        <Button title="Full gallery" variant="ghost" onPress={() => router.push({ pathname: '/providers/gallery', params: { id: p.id } })} />
        <Button title="Reviews" variant="ghost" onPress={() => router.push({ pathname: '/providers/reviews', params: { id: p.id } })} />
        <Text variant="caption" muted>{reviews.length} recent reviews · ★ {p.rating}</Text>
        <View style={styles.actions}>
          <Button title="Book now" style={{ flex: 1 }} onPress={() => {
            patch({ providerId: p.id });
            if (!isAuthenticated) router.push('/auth/login');
            else router.push('/booking/date');
          }} />
          <Button title="Chat" variant="secondary" style={{ flex: 1 }} onPress={() => router.push('/chat/m1')} />
          <Button title="Call" variant="ghost" style={{ flex: 1 }} onPress={() => {}} />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  cover: { width: '100%', height: 180 },
  body: { padding: 20, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  avatar: { width: 72, height: 72, borderRadius: 36, marginTop: -36, borderWidth: 3, borderColor: '#fff' },
  thumb: { width: 120, height: 90, marginRight: 10 },
  actions: { flexDirection: 'row', gap: 8 },
});
