import React from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function GalleryViewer() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  return (
    <Screen title="Gallery" onBack padded={false}>
      <ScrollView horizontal pagingEnabled accessibilityLabel="Image gallery">
        {galleryImages.map((uri, i) => (
          <Image
            key={uri}
            source={{ uri }}
            style={{ width, height: 360, backgroundColor: theme.colors.muted }}
            resizeMode="cover"
            accessibilityLabel={`Gallery image ${i + 1}`}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
