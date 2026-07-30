#!/usr/bin/env node
/**
 * Generates Expo Router screens for QuickFix UI-only app.
 * Run: node scripts/generate-screens.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'app');

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart());
  console.log('+', rel);
}

function screen({ title, subtitle, body, imports = '', onBack = true, extra = '' }) {
  return `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
${imports}

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="${title}"${subtitle ? ` subtitle="${subtitle}"` : ''}${onBack ? ' onBack' : ''}>
${body}
${extra}
    </Screen>
  );
}

const styles = StyleSheet.create({
  gap: { gap: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { padding: 16, gap: 8 },
});
`;
}

// ——— Foundation ———
write(
  'index.tsx',
  `import { Redirect } from 'expo-router';
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
  if (!isAuthenticated && role === 'guest') return <Redirect href="/(guest)" />;
  if (role === 'provider') return <Redirect href="/(provider)" />;
  if (role === 'customer') return <Redirect href="/(customer)" />;
  return <Redirect href="/welcome" />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
`,
);

write(
  '_layout.tsx',
  `import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
          animation: 'fade',
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
          <ToastProvider>
            <RootStack />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
`,
);

write(
  'onboarding.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

const slides = [
  { title: 'Local experts, on demand', body: 'Book trusted plumbers, electricians, cleaners and more near you.' },
  { title: 'Track every booking', body: 'Live status, chat, and timelines so you always know what is next.' },
  { title: 'Earn as a pro', body: 'Providers manage jobs, earnings, and availability in one place.' },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const slide = slides[index];

  return (
    <Screen scroll={false} padded={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text variant="display" color="#fff">
          QuickFix
        </Text>
      </LinearGradient>
      <View style={styles.content}>
        <Animated.View key={index} entering={FadeInRight} style={styles.copy}>
          <Text variant="h2">{slide.title}</Text>
          <Text variant="body" muted>
            {slide.body}
          </Text>
        </Animated.View>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === index ? theme.colors.primary : theme.colors.border },
              ]}
            />
          ))}
        </View>
        <Button
          title={index === slides.length - 1 ? 'Get started' : 'Continue'}
          onPress={() => {
            if (index < slides.length - 1) setIndex(index + 1);
            else {
              completeOnboarding();
              router.replace('/welcome');
            }
          }}
        />
        <Button
          title="Skip"
          variant="ghost"
          onPress={() => {
            completeOnboarding();
            router.replace('/welcome');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: Dimensions.get('window').height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, padding: 24, gap: 16, justifyContent: 'flex-end' },
  copy: { gap: 10, flex: 1, justifyContent: 'center' },
  dots: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
`,
);

write(
  'welcome.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

export default function Welcome() {
  const router = useRouter();
  const theme = useTheme();
  const setRole = useAppStore((s) => s.setRole);

  return (
    <Screen scroll={false} padded={false}>
      <LinearGradient
        colors={[theme.colors.primary, '#0B1220']}
        style={styles.hero}
      >
        <Text variant="display" color="#fff">
          QuickFix
        </Text>
        <Text variant="subtitle" color="#E2E8F0">
          Home services marketplace
        </Text>
      </LinearGradient>
      <View style={styles.actions}>
        <Button title="Continue as guest" onPress={() => { setRole('guest'); router.replace('/(guest)'); }} />
        <Button title="Sign in" variant="secondary" onPress={() => router.push('/auth/login')} />
        <Button title="Create account" variant="ghost" onPress={() => router.push('/auth/register')} />
        <Button title="Choose role" variant="ghost" onPress={() => router.push('/select-role')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  actions: { padding: 24, gap: 12 },
});
`,
);

write(
  'select-role.tsx',
  `import React from 'react';
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
`,
);

// Tab layouts helper
function tabsLayout(tabs) {
  const screens = tabs
    .map(
      (t) => `      <Tabs.Screen
        name="${t.name}"
        options={{
          title: '${t.title}',
          tabBarLabel: '${t.title}',
          tabBarIcon: ({ color, size }) => <Ionicons name="${t.icon}" color={color} size={size} />,
        }}
      />`,
    )
    .join('\n');
  return `import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';

export default function Layout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
${screens}
    </Tabs>
  );
}
`;
}

write('(guest)/_layout.tsx', tabsLayout([
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'search', title: 'Search', icon: 'search' },
  { name: 'categories', title: 'Categories', icon: 'grid' },
  { name: 'map', title: 'Map', icon: 'map' },
  { name: 'profile', title: 'Profile', icon: 'person' },
]));

write('(customer)/_layout.tsx', tabsLayout([
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'discover', title: 'Discover', icon: 'compass' },
  { name: 'bookings', title: 'Bookings', icon: 'calendar' },
  { name: 'messages', title: 'Messages', icon: 'chatbubbles' },
  { name: 'profile', title: 'Profile', icon: 'person' },
]));

write('(provider)/_layout.tsx', tabsLayout([
  { name: 'index', title: 'Dashboard', icon: 'speedometer' },
  { name: 'jobs', title: 'Jobs', icon: 'briefcase' },
  { name: 'messages', title: 'Messages', icon: 'chatbubbles' },
  { name: 'earnings', title: 'Earnings', icon: 'wallet' },
  { name: 'profile', title: 'Profile', icon: 'person' },
]));

console.log('Foundation + layouts written');
