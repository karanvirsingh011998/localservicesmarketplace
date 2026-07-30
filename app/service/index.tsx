import React from 'react';
import { Image, Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text } from '@/components';
import { services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ServiceListing() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Services" onBack>
      {services.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(`/service/${s.id}`)}
          style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.img} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted numberOfLines={2}>{s.description}</Text>
            <Text variant="subtitle">from ₹{s.priceFrom}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 12 },
  img: { width: 84, height: 84, borderRadius: 12 },
});
