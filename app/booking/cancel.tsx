import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text, Modal, useToast } from '@/components';

export default function CancelBooking() {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  const toast = useToast();

  return (
    <Screen title="Cancel booking" onBack keyboard>
      <Text variant="body" muted>
        Tell us why you are cancelling (mock).
      </Text>
      <TextField
        label="Reason"
        value={reason}
        onChangeText={setReason}
        multiline
        error={error}
        style={{ minHeight: 100 }}
      />
      <Button
        title="Cancel booking"
        variant="destructive"
        onPress={() => {
          if (!reason.trim()) {
            setError('Please add a short reason.');
            return;
          }
          setError('');
          setConfirm(true);
        }}
      />
      <Modal visible={confirm} title="Confirm cancellation?" onClose={() => setConfirm(false)}>
        <Text muted>This cannot be undone in the demo.</Text>
        <Button
          title="Yes, cancel"
          variant="destructive"
          onPress={() => {
            setConfirm(false);
            toast.show('Booking cancelled');
            router.replace('/(customer)/bookings');
          }}
        />
        <Button title="Keep booking" variant="ghost" onPress={() => setConfirm(false)} />
      </Modal>
    </Screen>
  );
}
