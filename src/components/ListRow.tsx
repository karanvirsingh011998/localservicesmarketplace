import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type Props = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  destructive?: boolean;
  showChevron?: boolean;
};

export function ListRow({
  title,
  subtitle,
  icon,
  onPress,
  destructive,
  showChevron = true,
}: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          minHeight: theme.sizes.touch,
          paddingVertical: theme.spacing[3],
          paddingHorizontal: theme.spacing[1],
          gap: theme.spacing[3],
          borderBottomColor: theme.colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {icon ? (
        <View
          style={{
            width: theme.sizes.avatarMd,
            height: theme.sizes.avatarMd,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.muted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons
            name={icon}
            size={theme.sizes.iconMd}
            color={destructive ? theme.colors.destructive : theme.colors.foreground}
          />
        </View>
      ) : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="subtitle" tone={destructive ? 'destructive' : 'default'}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" muted>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {showChevron ? (
        <Ionicons name="chevron-forward" size={18} color={theme.colors.mutedForeground} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
