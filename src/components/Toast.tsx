import React, { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type ToastContextValue = {
  show: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const show = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2400);
  }, []);
  const value = useMemo(() => ({ show }), [show]);
  const theme = useTheme();

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[
            styles.toast,
            {
              backgroundColor: theme.colors.foreground,
              borderRadius: theme.radius.md,
            },
          ]}
        >
          <Text color={theme.colors.background}>{message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast requires ToastProvider');
  return ctx;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
    padding: 14,
    zIndex: 100,
  },
});
