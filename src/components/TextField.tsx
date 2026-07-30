import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextField({ label, error, style, ...rest }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      {label ? (
        <Text variant="caption" muted style={styles.label}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.mutedForeground}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            borderColor: error ? theme.colors.destructive : theme.colors.border,
            color: theme.colors.foreground,
            borderRadius: theme.radius.md,
            fontFamily: theme.typography.body.fontFamily,
            minHeight: 48,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text variant="caption" color={theme.colors.destructive}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { marginLeft: 2 },
  input: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});
