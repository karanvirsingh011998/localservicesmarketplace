import React from 'react';
import { FlatList, View } from 'react-native';
import { Screen, Text, Card, EmptyState } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const tx = [
  { id: 't1', title: 'Payout to bank', amount: '-₹5,000', date: 'Jul 28', tone: 'default' as const },
  { id: 't2', title: 'AC Full Service', amount: '+₹699', date: 'Jul 30', tone: 'success' as const },
  { id: 't3', title: 'Pipe Leak Repair', amount: '+₹499', date: 'Jul 29', tone: 'success' as const },
];

export default function Transactions() {
  const theme = useTheme();
  return (
    <Screen title="Transaction history" onBack scroll={false}>
      <FlatList
        data={tx}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[5],
          gap: theme.spacing[2],
          paddingBottom: 40,
        }}
        ListEmptyComponent={<EmptyState title="No transactions" />}
        renderItem={({ item }) => (
          <Card elevated={false} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text variant="title">{item.title}</Text>
              <Text variant="caption" muted>
                {item.date}
              </Text>
            </View>
            <Text variant="subtitle" tone={item.tone === 'success' ? 'success' : 'default'}>
              {item.amount}
            </Text>
          </Card>
        )}
      />
    </Screen>
  );
}
