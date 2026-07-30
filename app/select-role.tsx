import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore, type AppRole } from '@/store/app-store';

const roles: { id: AppRole; title: string; body: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'guest', title: 'Browse as guest', body: 'Explore services without signing in.', icon: 'compass-outline' },
  { id: 'customer', title: 'I need a service', body: 'Book pros, chat, and track jobs.', icon: 'home-outline' },
  { id: 'provider', title: 'I offer services', body: 'Manage jobs, earnings, and availability.', icon: 'construct-outline' },
];

export default function SelectRole() {
  const theme = useTheme();
  const router = useRouter();
  const setRole = useAppStore((s) => s.setRole);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [selected, setSelected] = React.useState<AppRole>('customer');

  return (
    <Screen title="How will you use QuickFix?" onBack>
      {roles.map((r) => (
        <Pressable
          key={r.id}
          onPress={() => setSelected(r.id)}
          style={[
            styles.card,
            {
              borderColor: selected === r.id ? theme.colors.primary : theme.colors.border,
              backgroundColor: theme.colors.card,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <Ionicons name={r.icon} size={28} color={theme.colors.primary} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="title">{r.title}</Text>
            <Text variant="caption" muted>
              {r.body}
            </Text>
          </View>
        </Pressable>
      ))}
      <Button
        title="Continue"
        onPress={() => {
          setRole(selected);
          if (selected === 'guest') {
            setAuthenticated(false);
            router.replace('/(guest)');
          } else {
            router.push({ pathname: '/auth/login', params: { role: selected } });
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 14, padding: 16, borderWidth: 2, alignItems: 'center' },
});
