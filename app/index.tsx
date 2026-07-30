import { Redirect } from 'expo-router';
import { useAppStore } from '@/store/app-store';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export default function Index() {
  const hydrated = useAppStore((s) => s.hydrated);
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  const role = useAppStore((s) => s.role);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const theme = useTheme();

  if (!hydrated) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  if (!hasOnboarded) return <Redirect href="/onboarding" />;

  if (!isAuthenticated) {
    if (role === 'guest') return <Redirect href="/(guest)" />;
    return <Redirect href="/welcome" />;
  }

  if (role === 'provider') return <Redirect href="/(provider)" />;
  if (role === 'customer') return <Redirect href="/(customer)" />;
  return <Redirect href="/welcome" />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
