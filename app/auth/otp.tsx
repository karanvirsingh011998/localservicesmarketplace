import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, OtpInput, Button } from '@/components';
import { useAppStore } from '@/store/app-store';
import { useToast } from '@/components';

export default function Otp() {
  const [code, setCode] = useState('');
  const router = useRouter();
  const role = useAppStore((s) => s.role);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const toast = useToast();

  return (
    <Screen title="OTP verification" subtitle="Enter any 6 digits (mock)" onBack>
      <Text variant="body" muted>We sent a code to your phone.</Text>
      <OtpInput value={code} onChange={setCode} />
      <Button
        title="Verify"
        onPress={() => {
          setAuthenticated(true);
          toast.show('Verified (mock)');
          router.replace(role === 'provider' ? '/(provider)' : '/(customer)');
        }}
      />
      <Button title="Resend code" variant="ghost" onPress={() => toast.show('Code resent (mock)')} />
    </Screen>
  );
}
