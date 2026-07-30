import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, useToast } from '@/components';

export default function EditProviderProfile() {
  const [name, setName] = useState('Ravi Kumar');
  const [bio, setBio] = useState('Licensed plumber specializing in residential repairs.');
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Edit profile" onBack keyboard>
      <TextField label="Full name" value={name} onChangeText={setName} />
      <TextField label="Title" value="Master Plumber" />
      <TextField label="Bio" value={bio} onChangeText={setBio} multiline />
      <TextField label="Languages" value="English, Hindi, Kannada" />
      <Button title="Save" onPress={() => { toast.show('Profile updated'); router.back(); }} />
    </Screen>
  );
}
