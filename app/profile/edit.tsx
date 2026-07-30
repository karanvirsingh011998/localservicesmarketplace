import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Avatar, useToast } from '@/components';

export default function EditProfile() {
  const [name, setName] = useState('Demo Customer');
  const [email, setEmail] = useState('demo@quickfix.app');
  const [phone, setPhone] = useState('+91 98765 43210');
  const toast = useToast();
  const router = useRouter();

  return (
    <Screen title="Edit profile" onBack keyboard>
      <Avatar name={name} uri="https://i.pravatar.cc/150?u=customer" size={72} />
      <TextField label="Full name" value={name} onChangeText={setName} textContentType="name" />
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextField
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <Button
        title="Save"
        onPress={() => {
          toast.show('Profile updated');
          router.back();
        }}
      />
    </Screen>
  );
}
