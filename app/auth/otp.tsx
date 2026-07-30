import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, OtpInput, Button, useToast } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function Otp() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(30);
  const router = useRouter();
  const role = useAppStore((s) => s.role);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const toast = useToast();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <Screen title="OTP verification" subtitle="Enter any 6 digits (mock)" onBack keyboard>
      <Text variant="body" muted>
        We sent a code to your phone.
      </Text>
      <OtpInput value={code} onChange={setCode} />
      <Button
        title="Verify"
        disabled={code.replace(/\s/g, '').length < 6}
        onPress={() => {
          setAuthenticated(true);
          toast.show('Verified (mock)');
          router.replace(role === 'provider' ? '/(provider)' : '/(customer)');
        }}
      />
      <Button
        title={seconds > 0 ? `Resend in ${seconds}s` : 'Resend code'}
        variant="ghost"
        disabled={seconds > 0}
        onPress={() => {
          setSeconds(30);
          toast.show('Code resent (mock)');
        }}
      />
    </Screen>
  );
}
