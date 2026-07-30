import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export type TimelineEvent = {
  label: string;
  time?: string;
  done?: boolean;
};

type Props = {
  events: TimelineEvent[];
};

export function StatusTimeline({ events }: Props) {
  const theme = useTheme();
  return (
    <View accessibilityLabel="Booking timeline">
      {events.map((e, i) => (
        <View
          key={`${e.label}-${i}`}
          style={[
            styles.row,
            {
              borderLeftColor: e.done ? theme.colors.primary : theme.colors.border,
              paddingLeft: theme.spacing[3.5],
              marginBottom: theme.spacing[4],
              gap: theme.spacing[1],
            },
          ]}
        >
          {e.time ? (
            <Text variant="caption" muted>
              {e.time}
            </Text>
          ) : null}
          <Text variant="body" muted={!e.done}>
            {e.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { borderLeftWidth: 3 },
});
