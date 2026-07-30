import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

export default function Success() {
  const theme = useTheme();
  const router = useRouter();
  const reset = useAppStore((s) => s.resetBookingDraft);
  useEffect(() => { reset(); }, [reset]);
  return (
    <Screen title="Booked!" onBack={false}>
      <View style={styles.center}>
        <Animated.View entering={ZoomIn}>
          <Ionicons name="checkmark-circle" size={88} color={theme.colors.success} />
        </Animated.View>
        <Text variant="h2">Booking confirmed</Text>
        <Text variant="body" muted style={{ textAlign: 'center' }}>
          Your pro has been notified. Track progress anytime.
        </Text>
      </View>
      <Button title="View booking" onPress={() => router.replace('/booking/b1')} />
      <Button title="Go to bookings" variant="secondary" onPress={() => router.replace('/(customer)/bookings')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ center: { alignItems: 'center', gap: 12, paddingVertical: 40 } });
