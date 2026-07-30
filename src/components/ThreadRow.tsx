import React, { memo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import type { MessageThread } from '@/mocks/data';

type Props = {
  thread: MessageThread;
  onPress?: () => void;
};

function ThreadRowComponent({ thread, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${thread.name}. ${thread.lastMessage}${thread.unread ? `. ${thread.unread} unread` : ''}`}
      style={({ pressed }) => [
        styles.row,
        {
          gap: theme.spacing[3],
          paddingVertical: theme.spacing[3.5],
          borderBottomColor: theme.colors.border,
          opacity: pressed ? 0.75 : 1,
          minHeight: theme.sizes.touch + 8,
        },
      ]}
    >
      <Avatar uri={thread.avatar} name={thread.name} size={theme.sizes.avatarLg} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="title">{thread.name}</Text>
        <Text variant="caption" muted numberOfLines={1}>
          {thread.lastMessage}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <Text variant="caption" muted>
          {thread.time}
        </Text>
        {thread.unread ? <Badge label={String(thread.unread)} /> : null}
      </View>
    </Pressable>
  );
}

export const ThreadRow = memo(ThreadRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
