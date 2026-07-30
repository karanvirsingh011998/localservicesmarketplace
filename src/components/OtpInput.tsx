import React, { useRef, useState } from 'react';
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
  const digits = value.padEnd(length).slice(0, length).split('');

  return (
    <View style={styles.row} accessibilityLabel="OTP input">
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(r) => {
            refs.current[i] = r;
          }}
          value={digits[i]?.trim() ?? ''}
          keyboardType="number-pad"
          maxLength={1}
          style={[
            styles.cell,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              color: theme.colors.foreground,
              borderRadius: theme.radius.md,
              fontFamily: theme.typography.title.fontFamily,
            },
          ]}
          onChangeText={(t) => {
            const next = value.split('');
            next[i] = t.slice(-1);
            const joined = next.join('').slice(0, length);
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
  row: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  cell: {
    width: 48,
    height: 56,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});
