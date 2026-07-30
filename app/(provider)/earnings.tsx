import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Card } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const rows = [
  { id: '1', name: 'AC Full Service', amount: '+₹699', when: 'Today' },
  { id: '2', name: 'Pipe Leak Repair', amount: '+₹499', when: 'Yesterday' },
  { id: '3', name: 'Wiring Check', amount: '+₹499', when: 'Mon' },
];

export default function Earnings() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Earnings" subtitle="This week ₹12,450" onBack={false} scroll={false}>
      <View style={{ paddingHorizontal: theme.spacing[5], flex: 1, gap: theme.spacing[4] }}>
        <View
          style={{
            padding: theme.spacing[6],
            gap: theme.spacing[2],
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.xl,
          }}
        >
          <Text variant="caption" color={theme.colors.primaryForeground}>
            Available balance
          </Text>
          <Text variant="display" color={theme.colors.primaryForeground}>
            ₹8,240
          </Text>
        </View>
        <FlatList
          data={rows}
          keyExtractor={(r) => r.id}
          contentContainerStyle={{ gap: theme.spacing[2], paddingBottom: theme.spacing[8] }}
          renderItem={({ item }) => (
            <Card elevated={false} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text variant="title">{item.name}</Text>
                <Text variant="caption" muted>
                  {item.when}
                </Text>
              </View>
              <Text variant="subtitle" tone="success">
                {item.amount}
              </Text>
            </Card>
          )}
          ListFooterComponent={
            <View style={{ gap: theme.spacing[2], marginTop: theme.spacing[3] }}>
              <Button title="Transaction history" onPress={() => router.push('/provider/transactions')} />
              <Button title="Analytics" variant="secondary" onPress={() => router.push('/provider/analytics')} />
            </View>
          }
        />
      </View>
    </Screen>
  );
}
