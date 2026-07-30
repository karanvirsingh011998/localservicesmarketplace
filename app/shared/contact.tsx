import React, { useState } from 'react';
import { Screen, Text, TextField, Button, useToast } from '@/components';

export default function Contact() {
  const toast = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  return (
    <Screen title="Contact us" onBack keyboard>
      <Text variant="body" muted>Send a message (mock — nothing is submitted).</Text>
      <TextField label="Subject" value={subject} onChangeText={setSubject} />
      <TextField label="Message" value={message} onChangeText={setMessage} multiline style={{ minHeight: 120 }} error={error} />
      <Button title="Send" onPress={() => {
        if (!subject.trim() || !message.trim()) { setError('Please fill subject and message.'); return; }
        setError('');
        toast.show('Message sent (mock)');
      }} />
    </Screen>
  );
}
