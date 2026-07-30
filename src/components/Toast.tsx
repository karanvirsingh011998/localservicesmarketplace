import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

type ToastContextValue = {
  show: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const show = useCallback(
    (msg: string) => {
      if (timer.current) clearTimeout(timer.current);
      setMessage(msg);
      timer.current = setTimeout(() => setMessage(null), theme.motion.toastMs);
    },
    [theme.motion.toastMs],
  );

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <Animated.View
          entering={theme.reduceMotion ? undefined : FadeInUp}
          exiting={theme.reduceMotion ? undefined : FadeOutUp}
          accessibilityLiveRegion="polite"
          accessibilityRole="text"
          style={[
            styles.toast,
            {
              backgroundColor: theme.colors.foreground,
              borderRadius: theme.radius.md,
              left: theme.spacing[5],
              right: theme.spacing[5],
              bottom: Math.max(insets.bottom, theme.spacing[5]) + theme.spacing[5],
              padding: theme.spacing[3.5],
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
    zIndex: 100,
  },
});
