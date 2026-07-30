import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Button } from '@/components';
import { offers } from '@/mocks/data';
import { useToast } from '@/components';

export default function Coupons() {
  const toast = useToast();
  return (
    <Screen title="Coupons" onBack>
      {offers.map((o) => (
        <View key={o.id} style={[styles.card, { backgroundColor: o.color }]}>
          <Text variant="title" color="#fff">{o.code}</Text>
          <Text variant="caption" color="#fff">{o.title}</Text>
          <Button title="Apply" variant="secondary" onPress={() => toast.show('Coupon applied')} />
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 16, borderRadius: 14, gap: 8 } });
