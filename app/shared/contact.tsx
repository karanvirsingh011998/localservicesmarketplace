import React from 'react';
import { Screen, Text, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function Contact() {
  const toast = useToast();
  return (
    <Screen title="Contact us" onBack>
      <Text variant="body" muted>Send a message (mock — nothing is submitted).</Text>
      <TextField label="Subject" />
      <TextField label="Message" multiline />
      <Button title="Send" onPress={() => toast.show('Message sent (mock)')} />
    </Screen>
  );
}
