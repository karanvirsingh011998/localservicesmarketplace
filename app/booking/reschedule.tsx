import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button, Modal, Text, useToast } from '@/components';
import { timeSlots } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Reschedule() {
  const [time, setTime] = useState(timeSlots[4]);
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const theme = useTheme();

  return (
    <Screen
      title="Reschedule booking"
      onBack
      footer={<Button title="Confirm new time" onPress={() => setConfirm(true)} />}
    >
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        {timeSlots.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Modal visible={confirm} title="Confirm reschedule?" onClose={() => setConfirm(false)}>
        <Text muted>Move this booking to {time}?</Text>
        <Button
          title="Confirm"
          onPress={() => {
            setConfirm(false);
            toast.show('Rescheduled (mock)');
            router.back();
          }}
        />
        <Button title="Cancel" variant="ghost" onPress={() => setConfirm(false)} />
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
});
