import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type Props = {
  uri?: string;
  name: string;
  size?: number;
};

export function Avatar({ uri, name, size = 40 }: Props) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (uri && !failed) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.muted }}
        accessibilityLabel={`${name} avatar`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <View
      accessibilityLabel={`${name} avatar`}
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.accent,
        },
      ]}
    >
      <Text variant="caption" color={theme.colors.accentForeground}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
