import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text } from '@/components';
import { useToast } from '@/components';

export default function CancelBooking() {
  const [reason, setReason] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Cancel booking" onBack>
      <Text variant="body" muted>Tell us why you're cancelling (mock).</Text>
      <TextField label="Reason" value={reason} onChangeText={setReason} multiline />
      <Button title="Cancel booking" variant="destructive" onPress={() => { toast.show('Booking cancelled'); router.replace('/(customer)/bookings'); }} />
    </Screen>
  );
}
