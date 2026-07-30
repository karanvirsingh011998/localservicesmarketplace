import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Button } from './Button';

type Props = {
  title: string;
  subtitle?: string;
  code: string;
  discount: string;
  color: string;
  onCopy?: () => void;
};

export function OfferCard({ title, subtitle, code, discount, color, onCopy }: Props) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: color,
          borderRadius: theme.radius.lg,
          padding: theme.spacing[5],
          gap: theme.spacing[2],
        },
      ]}
      accessibilityLabel={`${title}. Code ${code}. Discount ${discount}`}
    >
      <Text variant="h4" color={theme.colors.primaryForeground}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="caption" color={theme.colors.primaryForeground}>
          {subtitle}
        </Text>
      ) : null}
      <Text variant="title" color={theme.colors.primaryForeground}>
        {code} · {discount}
      </Text>
      {onCopy ? (
        <Button title="Copy code" variant="secondary" onPress={onCopy} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
});
