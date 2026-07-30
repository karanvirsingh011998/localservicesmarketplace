import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function ProviderGallery() {
  const router = useRouter();
  return (
    <Screen title="Gallery" onBack>
      <View style={styles.grid}>
        {galleryImages.map((uri, i) => (
          <Pressable key={uri} onPress={() => router.push({ pathname: '/shared/image-viewer', params: { index: String(i) } })}>
            <Image source={{ uri }} style={styles.img} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  img: { width: 160, height: 120, borderRadius: 12 },
});
