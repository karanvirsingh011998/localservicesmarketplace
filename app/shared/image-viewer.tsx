import React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ImageViewer() {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const i = Number(index || 0);
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  return (
    <Screen title="Image" onBack padded={false}>
      <Image
        source={{ uri: galleryImages[i] || galleryImages[0] }}
        style={{ width, height: height * 0.7, backgroundColor: theme.colors.muted }}
        resizeMode="contain"
        accessibilityLabel="Full size image"
      />
    </Screen>
  );
}
