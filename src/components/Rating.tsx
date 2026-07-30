import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  value: number;
  size?: number;
};

export function Rating({ value, size = 14 }: Props) {
  const theme = useTheme();
  const full = Math.floor(value);
  return (
    <View style={styles.row} accessibilityLabel={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < full ? 'star' : i < value ? 'star-half' : 'star-outline'}
          size={size}
          color={theme.colors.warning}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2 },
});
