import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { galleryImages } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Portfolio() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Portfolio" onBack>
      <Text variant="body" muted>Before & after work samples (mock).</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
        {galleryImages.map((uri, i) => (
          <Pressable key={uri} onPress={() => router.push({ pathname: '/shared/image-viewer', params: { index: String(i) } })} accessibilityRole="imagebutton" accessibilityLabel={`Portfolio image ${i + 1}`}>
            <Image source={{ uri }} style={{ width: 160, height: 110, borderRadius: theme.radius.md, backgroundColor: theme.colors.muted }} />
          </Pressable>
        ))}
      </View>
      <Button title="Open gallery viewer" variant="secondary" onPress={() => router.push('/shared/gallery-viewer')} />
    </Screen>
  );
}
