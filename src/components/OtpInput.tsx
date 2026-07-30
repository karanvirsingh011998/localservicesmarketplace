import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

type Props = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
};

export function OtpInput({ length = 6, value, onChange }: Props) {
  const theme = useTheme();
  const refs = useRef<(TextInput | null)[]>([]);
  const digits = value.padEnd(length, ' ').slice(0, length).split('');

  return (
    <View
      style={[styles.row, { gap: theme.spacing[2.5], justifyContent: 'center' }]}
      accessibilityLabel="One-time password input"
    >
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(r) => {
            refs.current[i] = r;
          }}
          value={digits[i]?.trim() ?? ''}
          keyboardType="number-pad"
          maxLength={i === 0 ? length : 1}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          accessibilityLabel={`Digit ${i + 1} of ${length}`}
          style={{
            width: theme.sizes.control,
            height: theme.sizes.fab,
            borderWidth: 1,
            textAlign: 'center',
            fontSize: 20,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            color: theme.colors.foreground,
            borderRadius: theme.radius.md,
            fontFamily: theme.typography.title.fontFamily,
          }}
          onChangeText={(t) => {
            if (i === 0 && t.length > 1) {
              onChange(t.replace(/\D/g, '').slice(0, length));
              refs.current[Math.min(t.length, length) - 1]?.focus();
              return;
            }
            const next = value.split('');
            next[i] = t.slice(-1);
            const joined = next.join('').replace(/\s/g, '').slice(0, length);
            onChange(joined);
            if (t && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !digits[i]?.trim() && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
