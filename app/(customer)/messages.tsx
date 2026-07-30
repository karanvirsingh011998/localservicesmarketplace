import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, ThreadRow, EmptyState } from '@/components';
import { threads } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Messages() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Screen title="Messages" onBack={false} scroll={false}>
      {threads.length === 0 ? (
        <EmptyState title="No messages" subtitle="Chats with providers will appear here." />
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(t) => t.id}
          contentContainerStyle={{ paddingHorizontal: theme.spacing[5] }}
          renderItem={({ item }) => (
            <ThreadRow thread={item} onPress={() => router.push(`/chat/${item.id}`)} />
          )}
        />
      )}
    </Screen>
  );
}
