import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import { ToastProvider } from '@/components';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function RootStack() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.resolved === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: theme.reduceMotion ? 'none' : 'slide_from_right',
          animationDuration: theme.motion.screenMs,
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Fraunces_600SemiBold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => undefined);
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <ToastProvider>
              <RootStack />
            </ToastProvider>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
