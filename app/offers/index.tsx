import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Button } from '@/components';
import { offers } from '@/mocks/data';
import { useToast } from '@/components';

export default function Offers() {
  const toast = useToast();
  return (
    <Screen title="Offers" onBack>
      {offers.map((o) => (
        <View key={o.id} style={[styles.card, { backgroundColor: o.color }]}>
          <Text variant="h4" color="#fff">{o.title}</Text>
          <Text variant="caption" color="#fff">{o.subtitle}</Text>
          <Text variant="title" color="#fff">{o.code} · {o.discount}</Text>
          <Button title="Copy code" variant="secondary" onPress={() => toast.show(`Copied ${o.code}`)} />
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 20, borderRadius: 16, gap: 8 } });
