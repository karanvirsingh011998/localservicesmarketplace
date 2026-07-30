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

export function TextField({ label, error, style, editable = true, ...rest }: Props) {
  const theme = useTheme();
  const labelId = label ? `${label.replace(/\s+/g, '-').toLowerCase()}-label` : undefined;

  return (
    <View style={[styles.wrap, { gap: theme.spacing[1.5] }]}>
      {label ? (
        <Text variant="caption" muted nativeID={labelId} style={{ marginLeft: theme.spacing[0.5] }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        accessibilityLabel={label ?? rest.placeholder}
        accessibilityLabelledBy={labelId}
        accessibilityState={{ disabled: !editable }}
        editable={editable}
        placeholderTextColor={theme.colors.mutedForeground}
        style={[
          {
            backgroundColor: theme.colors.card,
            borderColor: error ? theme.colors.destructive : theme.colors.border,
            color: theme.colors.foreground,
            borderRadius: theme.radius.md,
            fontFamily: theme.typography.body.fontFamily,
            fontSize: theme.typography.body.fontSize,
            minHeight: theme.sizes.control,
            borderWidth: 1,
            paddingHorizontal: theme.spacing[3.5],
            paddingVertical: theme.spacing[3],
            opacity: editable ? 1 : 0.6,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text
          variant="caption"
          tone="destructive"
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
});
