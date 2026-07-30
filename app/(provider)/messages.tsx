import React from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, ThreadRow, EmptyState } from '@/components';
import { threads } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderMessages() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Messages" onBack={false} scroll={false}>
      <FlatList
        data={threads}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingHorizontal: theme.spacing[5] }}
        ListEmptyComponent={<EmptyState title="No messages" />}
        renderItem={({ item }) => (
          <ThreadRow thread={item} onPress={() => router.push(`/chat/${item.id}`)} />
        )}
      />
    </Screen>
  );
}
