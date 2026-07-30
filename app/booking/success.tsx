import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

export default function Success() {
  const theme = useTheme();
  const router = useRouter();
  const reset = useAppStore((s) => s.resetBookingDraft);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Screen title="Booked!" onBack={false} edges={['top', 'bottom']}>
      <View style={[styles.center, { paddingVertical: theme.spacing[10], gap: theme.spacing[3] }]}>
        {theme.reduceMotion ? (
          <Ionicons name="checkmark-circle" size={88} color={theme.colors.success} />
        ) : (
          <View accessible accessibilityLabel="Booking confirmed">
            <LottieView
              source={require('../../assets/success.json')}
              autoPlay
              loop={false}
              style={styles.successAnimation}
            />
          </View>
        )}
        <Text variant="h2">Booking confirmed</Text>
        <Text variant="body" muted style={{ textAlign: 'center' }}>
          Your pro has been notified. Track progress anytime.
        </Text>
      </View>
      <Button title="View booking" onPress={() => router.replace('/booking/b1')} />
      <Button
        title="Go to bookings"
        variant="secondary"
        onPress={() => router.replace('/(customer)/bookings')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  successAnimation: { width: 112, height: 112 },
});
