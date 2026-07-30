import React, { useState } from 'react';
import { Image, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge, Rating, Chip, EmptyState } from '@/components';
import { providers, galleryImages, reviews } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProviderProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = providers.find((x) => x.id === id);
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (!p) {
    return (
      <Screen title="Provider" onBack>
        <EmptyState title="Provider not found" />
      </Screen>
    );
  }

  return (
    <Screen title={p.name} onBack padded={false} scroll>
      <Image
        source={{ uri: p.cover }}
        style={styles.cover}
        accessibilityLabel={`${p.name} cover`}
      />
      <View style={[styles.body, { padding: theme.spacing[5], gap: theme.spacing[3.5], paddingBottom: 100 }]}>
        <View style={styles.row}>
          <Image
            source={{ uri: p.avatar }}
            style={[
              styles.avatar,
              { borderColor: theme.colors.card, backgroundColor: theme.colors.muted },
            ]}
            accessibilityLabel={`${p.name} photo`}
          />
          <View style={{ flex: 1, gap: 4 }}>
            <View style={styles.row}>
              <Text variant="h4">{p.name}</Text>
              {p.verified ? <Badge label="Verified" tone="success" /> : null}
            </View>
            <Text variant="caption" muted>
              {p.title} · {p.experienceYears} yrs · {p.jobs} jobs
            </Text>
            <Rating value={p.rating} />
          </View>
        </View>
        <Text variant="body">{p.bio}</Text>
        <View style={[styles.row, { flexWrap: 'wrap', gap: 8 }]}>
          {p.languages.map((l) => (
            <Chip key={l} label={l} />
          ))}
        </View>
        <Text variant="h4">Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((uri, i) => (
            <Pressable
              key={uri}
              onPress={() =>
                router.push({ pathname: '/shared/image-viewer', params: { index: String(i) } })
              }
              accessibilityRole="imagebutton"
              accessibilityLabel={`Portfolio image ${i + 1}`}
            >
              <Image
                source={{ uri }}
                style={[styles.thumb, { borderRadius: theme.radius.md, backgroundColor: theme.colors.muted }]}
              />
            </Pressable>
          ))}
        </ScrollView>
        <Button
          title="Full gallery"
          variant="ghost"
          onPress={() => router.push({ pathname: '/providers/gallery', params: { id: p.id } })}
        />
        <Button
          title={`Reviews (${reviews.length})`}
          variant="ghost"
          onPress={() => router.push({ pathname: '/providers/reviews', params: { id: p.id } })}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          gap: 8,
          padding: 16,
          paddingBottom: Math.max(insets.bottom, 16),
          backgroundColor: theme.colors.background,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.colors.border,
        }}
      >
        <Button
          title="Book now"
          style={{ flex: 1 }}
          onPress={() => {
            patch({ providerId: p.id });
            if (!isAuthenticated) router.push('/auth/login');
            else router.push('/booking/date');
          }}
        />
        <Button
          title="Chat"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={() => {
            if (!isAuthenticated) router.push('/auth/login');
            else router.push('/chat/m1');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 180 },
  body: {},
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginTop: -36,
    borderWidth: 3,
  },
  thumb: { width: 120, height: 90, marginRight: 10 },
});
