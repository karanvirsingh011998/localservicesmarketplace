import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button } from '@/components';
import { timeSlots } from '@/mocks/data';
import { useToast } from '@/components';

export default function Reschedule() {
  const [time, setTime] = useState(timeSlots[4]);
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Reschedule booking" onBack>
      <View style={styles.row}>
        {timeSlots.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Button title="Confirm new time" onPress={() => { toast.show('Rescheduled (mock)'); router.back(); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
