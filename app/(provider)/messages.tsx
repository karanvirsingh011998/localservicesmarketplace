import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Avatar, Badge } from '@/components';
import { threads } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Messages() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Messages" onBack={false}>
      {threads.map((t) => (
        <Pressable
          key={t.id}
          onPress={() => router.push(`/chat/${t.id}`)}
          style={[styles.row, { borderBottomColor: theme.colors.border }]}
        >
          <Avatar uri={t.avatar} name={t.name} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="title">{t.name}</Text>
            <Text variant="caption" muted numberOfLines={1}>{t.lastMessage}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <Text variant="caption" muted>{t.time}</Text>
            {t.unread ? <Badge label={String(t.unread)} /> : null}
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, alignItems: 'center' },
});
