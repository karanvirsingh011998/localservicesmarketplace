import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type Props = {
  steps: string[];
  current: number;
};

export function StepIndicator({ steps, current }: Props) {
  const theme = useTheme();
  return (
    <View style={styles.row} accessibilityLabel={`Step ${current + 1} of ${steps.length}`}>
      {steps.map((label, i) => {
        const active = i <= current;
        return (
          <View key={label} style={styles.item}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: active ? theme.colors.primary : theme.colors.muted,
                },
              ]}
            />
            <Text
              variant="caption"
              color={active ? theme.colors.primary : theme.colors.mutedForeground}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  item: { flex: 1, alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
