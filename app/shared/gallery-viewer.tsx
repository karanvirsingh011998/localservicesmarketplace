import React from 'react';
import { Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function GalleryViewer() {
  return (
    <Screen title="Gallery" onBack padded={false}>
      <ScrollView horizontal pagingEnabled>
        {galleryImages.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.img} resizeMode="cover" />
        ))}
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  img: { width: Dimensions.get('window').width, height: 360 },
});
