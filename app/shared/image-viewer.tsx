import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function ImageViewer() {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const i = Number(index || 0);
  return (
    <Screen title="Image" onBack padded={false}>
      <Image source={{ uri: galleryImages[i] || galleryImages[0] }} style={styles.img} resizeMode="contain" />
    </Screen>
  );
}
const styles = StyleSheet.create({
  img: { width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.7 },
});
