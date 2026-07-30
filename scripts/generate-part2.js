#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'app');

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  if (!fs.existsSync(full) || process.env.FORCE === '1') {
    fs.writeFileSync(full, content.trimStart());
    console.log('+', rel);
  }
}

function simple(title, lines, opts = {}) {
  const links = (opts.links || [])
    .map(
      (l) =>
        `      <Button title="${l.label}" ${l.variant ? `variant="${l.variant}" ` : ''}onPress={() => router.push('${l.href}' as any)} />`,
    )
    .join('\n');
  const chips = (opts.chips || [])
    .map((c) => `        <Chip label="${c}" />`)
    .join('\n');
  return `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Chip, EmptyState } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

export default function Page() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="${title}"${opts.subtitle ? ` subtitle="${opts.subtitle}"` : ''}${opts.onBack === false ? '' : ' onBack'}>
      <Text variant="body" muted>
        ${lines}
      </Text>
${chips ? `      <View style={styles.row}>\n${chips}\n      </View>` : ''}
${links}
      ${opts.empty ? `<EmptyState title="${opts.empty}" />` : ''}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
`;
}

// Auth
write(
  'auth/login.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, TextField, Button } from '@/components';
import { useAppStore, type AppRole } from '@/store/app-store';

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setRole = useAppStore((s) => s.setRole);
  const [email, setEmail] = useState('demo@quickfix.app');
  const [password, setPassword] = useState('demo1234');

  const finish = (role: AppRole) => {
    setRole(role);
    setAuthenticated(true);
    router.replace(role === 'provider' ? '/(provider)' : '/(customer)');
  };

  return (
    <Screen title="Sign in" subtitle="UI demo — any credentials work" onBack>
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextField label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign in" onPress={() => finish((params.role as AppRole) || 'customer')} />
      <Button title="Verify with OTP" variant="secondary" onPress={() => router.push('/auth/otp')} />
      <Pressable onPress={() => router.push('/auth/forgot-password')}>
        <Text variant="caption" muted style={{ textAlign: 'center' }}>Forgot password?</Text>
      </Pressable>
      <Button title="Create account" variant="ghost" onPress={() => router.push('/auth/register')} />
      <View style={styles.row}>
        <Button title="Customer demo" variant="secondary" style={{ flex: 1 }} onPress={() => finish('customer')} />
        <Button title="Provider demo" variant="secondary" style={{ flex: 1 }} onPress={() => finish('provider')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
});
`,
);

write(
  'auth/register.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function Register() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setRole = useAppStore((s) => s.setRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Screen title="Create account" onBack>
      <TextField label="Full name" value={name} onChangeText={setName} />
      <TextField label="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextField label="Password" secureTextEntry />
      <TextField label="Phone" keyboardType="phone-pad" placeholder="+91" />
      <Button
        title="Continue"
        onPress={() => {
          setRole('customer');
          router.push('/auth/otp');
        }}
      />
      <Text variant="caption" muted style={{ textAlign: 'center' }}>
        By continuing you agree to Terms & Privacy (UI only).
      </Text>
      <Button title="Already have an account" variant="ghost" onPress={() => router.push('/auth/login')} />
    </Screen>
  );
}
`,
);

write(
  'auth/otp.tsx',
  `import React, { useState } from 'react';
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
`,
);

write(
  'auth/forgot-password.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Forgot password" onBack>
      <Text variant="body" muted>Enter your email to receive a reset link (mock).</Text>
      <TextField label="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Button title="Send reset link" onPress={() => { toast.show('Reset link sent'); router.push('/auth/reset-password'); }} />
    </Screen>
  );
}
`,
);

write(
  'auth/reset-password.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function ResetPassword() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Reset password" onBack>
      <TextField label="New password" secureTextEntry value={a} onChangeText={setA} />
      <TextField label="Confirm password" secureTextEntry value={b} onChangeText={setB} />
      <Button title="Update password" onPress={() => { toast.show('Password updated'); router.replace('/auth/login'); }} />
    </Screen>
  );
}
`,
);

// Guest home
write(
  '(guest)/index.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen, Text, SearchBar, CategoryCard, ProviderCard, Chip, Badge } from '@/components';
import { categories, providers, offers, services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function GuestHome() {
  const router = useRouter();
  const theme = useTheme();
  const location = useAppStore((s) => s.locationLabel);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Screen
      title="Good afternoon"
      subtitle={location}
      onBack={false}
      right={<Badge label="Guest" />}
      refreshing={refreshing}
      onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); }}
    >
      <Pressable onPress={() => router.push('/shared/location-picker')}>
        <Text variant="caption" color={theme.colors.primary}>Change location</Text>
      </Pressable>
      <SearchBar onPress={() => router.push('/(guest)/search')} />

      <Animated.View entering={FadeInDown.delay(80)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {offers.map((o) => (
            <Pressable
              key={o.id}
              onPress={() => router.push('/offers')}
              style={[styles.banner, { backgroundColor: o.color, borderRadius: theme.radius.lg }]}
            >
              <Text variant="title" color="#fff">{o.title}</Text>
              <Text variant="caption" color="#fff">{o.subtitle}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      <Text variant="h4">Featured categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {categories.filter((c) => c.featured).map((c) => (
          <CategoryCard key={c.id} category={c} onPress={() => router.push(\`/category/\${c.id}\`)} />
        ))}
      </ScrollView>

      <View style={styles.sectionHead}>
        <Text variant="h4">Popular services</Text>
        <Pressable onPress={() => router.push('/service')}><Text variant="caption" color={theme.colors.primary}>See all</Text></Pressable>
      </View>
      {services.slice(0, 3).map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(\`/service/\${s.id}\`)}
          style={[styles.svc, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.svcImg} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted>from ₹{s.priceFrom} · ★ {s.rating}</Text>
          </View>
        </Pressable>
      ))}

      <Text variant="h4">Nearby providers</Text>
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}

      <Text variant="h4">Emergency</Text>
      <View style={styles.row}>
        <Chip label="Plumber now" onPress={() => router.push('/service/svc5')} />
        <Chip label="Electrician now" onPress={() => router.push('/(guest)/search')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { gap: 12, paddingVertical: 4 },
  banner: { width: 260, padding: 16, gap: 6, marginRight: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  svc: { flexDirection: 'row', gap: 12, padding: 10 },
  svcImg: { width: 72, height: 72, borderRadius: 12 },
});
`,
);

write(
  '(guest)/search.tsx',
  `import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Chip, Button } from '@/components';
import { recentSearches, trendingSearches } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Search() {
  const [q, setQ] = useState('');
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Search" onBack={false}>
      <TextField
        placeholder="Services, providers, PIN…"
        value={q}
        onChangeText={setQ}
        onSubmitEditing={() => router.push({ pathname: '/search/results', params: { q } })}
        autoFocus
      />
      <Button title="Search" onPress={() => router.push({ pathname: '/search/results', params: { q } })} />
      <Text variant="subtitle">Recent</Text>
      <View style={styles.row}>
        {recentSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => router.push({ pathname: '/search/results', params: { q: s } })} />
        ))}
      </View>
      <Text variant="subtitle">Trending</Text>
      <View style={styles.row}>
        {trendingSearches.map((s) => (
          <Chip key={s} label={s} onPress={() => router.push({ pathname: '/search/results', params: { q: s } })} />
        ))}
      </View>
      <Pressable onPress={() => router.push('/shared/filters')}>
        <Text color={theme.colors.primary}>Open filters</Text>
      </Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  '(guest)/categories.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, CategoryCard, TextField } from '@/components';
import { categories } from '@/mocks/data';

export default function Categories() {
  const router = useRouter();
  const [q, setQ] = React.useState('');
  const filtered = categories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen title="Categories" onBack={false}>
      <TextField placeholder="Search categories" value={q} onChangeText={setQ} />
      <Text variant="subtitle">Popular</Text>
      <View style={styles.grid}>
        {filtered.map((c) => (
          <CategoryCard key={c.id} category={c} onPress={() => router.push(\`/category/\${c.id}\`)} />
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 } });
`,
);

write(
  '(guest)/map.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, ProviderCard, BottomSheet, Button } from '@/components';
import { providers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const radii = ['2 KM', '5 KM', '10 KM', '25 KM', '50 KM'];

export default function MapTab() {
  const theme = useTheme();
  const router = useRouter();
  const [radius, setRadius] = useState('5 KM');
  const [sheet, setSheet] = useState(false);
  return (
    <Screen title="Map" subtitle="Mock map preview" onBack={false}>
      <View style={[styles.map, { backgroundColor: theme.colors.muted, borderRadius: theme.radius.xl }]}>
        <Text variant="title">Interactive map (UI mock)</Text>
        <Text variant="caption" muted>Markers · clustering · ETA placeholders</Text>
        {providers.map((p) => (
          <Pressable key={p.id} onPress={() => setSheet(true)} style={[styles.pin, { backgroundColor: theme.colors.primary }]}>
            <Text color="#fff" variant="caption">{p.name.split(' ')[0]}</Text>
          </Pressable>
        ))}
      </View>
      <Text variant="subtitle">Search radius</Text>
      <View style={styles.row}>
        {radii.map((r) => (
          <Chip key={r} label={r} selected={radius === r} onPress={() => setRadius(r)} />
        ))}
      </View>
      {providers.slice(0, 2).map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}
      <BottomSheet visible={sheet} title="Nearby provider" onClose={() => setSheet(false)}>
        <Text>Ravi Kumar · 1.2 km · ETA 12 min</Text>
        <Button title="View profile" onPress={() => { setSheet(false); router.push('/providers/p1'); }} />
      </BottomSheet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  map: { height: 280, alignItems: 'center', justifyContent: 'center', gap: 12, overflow: 'hidden' },
  pin: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
`,
);

write(
  '(guest)/profile.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function GuestProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  return (
    <Screen title="Profile" onBack={false}>
      <Text variant="body" muted>Browsing as guest. Sign in to book and chat.</Text>
      <Button title="Sign in" onPress={() => router.push('/auth/login')} />
      <Button title="Create account" variant="secondary" onPress={() => router.push('/auth/register')} />
      <Divider />
      <Button title="Choose role" variant="ghost" onPress={() => router.push('/select-role')} />
      <Button title="Help & support" variant="ghost" onPress={() => router.push('/shared/help')} />
      <Button title="About" variant="ghost" onPress={() => router.push('/shared/about')} />
      <Button title="Privacy" variant="ghost" onPress={() => router.push('/shared/privacy')} />
      <Button title="Terms" variant="ghost" onPress={() => router.push('/shared/terms')} />
      <Button title="Reset demo state" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
`,
);

console.log('Auth + guest tabs done');
