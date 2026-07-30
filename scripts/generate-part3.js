#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'app');
function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart());
  console.log('+', rel);
}

write(
  '(customer)/index.tsx',
  `import React from 'react';
import { Redirect } from 'expo-router';

/** Customer home reuses guest marketplace home experience */
export default function CustomerHome() {
  return <Redirect href="/(guest)" />;
}
`,
);

write(
  '(customer)/discover.tsx',
  `import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, ProviderCard } from '@/components';
import { services, providers, offers } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Discover() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Discover" subtitle="Recommended near you" onBack={false}>
      <Text variant="h4">Today's offers</Text>
      <View style={styles.row}>
        {offers.map((o) => (
          <Chip key={o.id} label={o.code} onPress={() => router.push('/offers')} />
        ))}
      </View>
      <Text variant="h4">Recommended services</Text>
      {services.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(\`/service/\${s.id}\`)}
          style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.img} />
          <View style={{ flex: 1 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted>from ₹{s.priceFrom}</Text>
          </View>
        </Pressable>
      ))}
      <Text variant="h4">Top rated professionals</Text>
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { flexDirection: 'row', gap: 12, padding: 10 },
  img: { width: 64, height: 64, borderRadius: 10 },
});
`,
);

write(
  '(customer)/bookings.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, BookingCard, Chip, Button } from '@/components';
import { bookings } from '@/mocks/data';

export default function Bookings() {
  const router = useRouter();
  const [tab, setTab] = useState<'active' | 'history'>('active');
  const list = bookings.filter((b) =>
    tab === 'active' ? b.status !== 'completed' && b.status !== 'cancelled' : b.status === 'completed' || b.status === 'cancelled',
  );
  return (
    <Screen title="Bookings" onBack={false}>
      <View style={styles.row}>
        <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
        <Chip label="History" selected={tab === 'history'} onPress={() => setTab('history')} />
      </View>
      {list.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(\`/booking/\${b.id}\`)} />
      ))}
      <Button title="Browse services" variant="secondary" onPress={() => router.push('/service')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 8 } });
`,
);

write(
  '(customer)/messages.tsx',
  `import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Avatar, Badge } from '@/components';
import { threads } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Messages() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Messages" onBack={false}>
      {threads.map((t) => (
        <Pressable
          key={t.id}
          onPress={() => router.push(\`/chat/\${t.id}\`)}
          style={[styles.row, { borderBottomColor: theme.colors.border }]}
        >
          <Avatar uri={t.avatar} name={t.name} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="title">{t.name}</Text>
            <Text variant="caption" muted numberOfLines={1}>{t.lastMessage}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <Text variant="caption" muted>{t.time}</Text>
            {t.unread ? <Badge label={String(t.unread)} /> : null}
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, alignItems: 'center' },
});
`,
);

write(
  '(customer)/profile.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Avatar, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

const links = [
  ['Edit profile', '/profile/edit'],
  ['Notifications', '/notifications'],
  ['Favorites', '/favorites'],
  ['Saved addresses', '/addresses'],
  ['Coupons', '/coupons'],
  ['Rewards', '/rewards'],
  ['Refer & earn', '/refer'],
  ['Settings', '/profile/settings'],
  ['Help & support', '/shared/help'],
];

export default function CustomerProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Demo Customer" uri="https://i.pravatar.cc/150?u=customer" size={72} />
      <Text variant="h4">Demo Customer</Text>
      <Text variant="caption" muted>demo@quickfix.app</Text>
      <Divider />
      {links.map(([label, href]) => (
        <Button key={href} title={label} variant="ghost" onPress={() => router.push(href as any)} />
      ))}
      <Button title="Switch to provider demo" variant="secondary" onPress={() => { setRole('provider'); router.replace('/(provider)'); }} />
      <Button title="Sign out" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
`,
);

// Provider tabs
write(
  '(provider)/index.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, BookingCard, Badge } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderDashboard() {
  const router = useRouter();
  const theme = useTheme();
  const pending = bookings.filter((b) => b.status === 'pending' || b.status === 'accepted');
  return (
    <Screen title="Dashboard" subtitle="Today's overview" onBack={false} right={<Badge label="Online" tone="success" />}>
      <View style={styles.stats}>
        {[
          ['₹4,820', "Today"],
          ['6', 'Jobs'],
          ['4.9', 'Rating'],
        ].map(([v, l]) => (
          <View key={l} style={[styles.stat, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
            <Text variant="h3">{v}</Text>
            <Text variant="caption" muted>{l}</Text>
          </View>
        ))}
      </View>
      <Button title="New booking requests" onPress={() => router.push('/provider/requests')} />
      <Button title="Availability" variant="secondary" onPress={() => router.push('/provider/availability')} />
      <Text variant="h4">Active jobs</Text>
      {pending.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(\`/provider/jobs/\${b.id}\`)} />
      ))}
      <Button title="Analytics" variant="ghost" onPress={() => router.push('/provider/analytics')} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, padding: 14, gap: 4 },
});
`,
);

write(
  '(provider)/jobs.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, BookingCard, Button } from '@/components';
import { bookings } from '@/mocks/data';

export default function ProviderJobs() {
  const [tab, setTab] = useState<'requests' | 'active' | 'completed'>('requests');
  const router = useRouter();
  const list =
    tab === 'requests'
      ? bookings.filter((b) => b.status === 'pending' || b.status === 'accepted')
      : tab === 'active'
        ? bookings.filter((b) => b.status === 'in_progress')
        : bookings.filter((b) => b.status === 'completed');
  return (
    <Screen title="Jobs" onBack={false}>
      <View style={styles.row}>
        <Chip label="Requests" selected={tab === 'requests'} onPress={() => setTab('requests')} />
        <Chip label="Active" selected={tab === 'active'} onPress={() => setTab('active')} />
        <Chip label="Completed" selected={tab === 'completed'} onPress={() => setTab('completed')} />
      </View>
      {list.map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(\`/provider/jobs/\${b.id}\`)} />
      ))}
      <Button title="Open requests screen" variant="ghost" onPress={() => router.push('/provider/requests')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  '(provider)/messages.tsx',
  `export { default } from '../(customer)/messages';
`,
);

write(
  '(provider)/earnings.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const rows = [
  ['AC Full Service', '+₹699', 'Today'],
  ['Pipe Leak Repair', '+₹499', 'Yesterday'],
  ['Wiring Check', '+₹499', 'Mon'],
];

export default function Earnings() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Earnings" subtitle="This week ₹12,450" onBack={false}>
      <View style={[styles.hero, { backgroundColor: theme.colors.primary, borderRadius: theme.radius.xl }]}>
        <Text variant="caption" color="#fff">Available balance</Text>
        <Text variant="display" color="#fff">₹8,240</Text>
      </View>
      {rows.map(([n, a, d]) => (
        <View key={n} style={[styles.row, { borderBottomColor: theme.colors.border }]}>
          <View>
            <Text variant="title">{n}</Text>
            <Text variant="caption" muted>{d}</Text>
          </View>
          <Text variant="subtitle" color={theme.colors.success}>{a}</Text>
        </View>
      ))}
      <Button title="Transaction history" onPress={() => router.push('/provider/transactions')} />
      <Button title="Analytics" variant="secondary" onPress={() => router.push('/provider/analytics')} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { padding: 24, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});
`,
);

write(
  '(provider)/profile.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Avatar, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';

const links = [
  ['Provider profile', '/provider/profile-view'],
  ['Edit profile', '/provider/edit-profile'],
  ['My services', '/provider/services'],
  ['Availability', '/provider/availability'],
  ['Calendar', '/provider/calendar'],
  ['Portfolio', '/provider/portfolio'],
  ['Upload documents', '/provider/documents'],
  ['Customer reviews', '/provider/reviews'],
  ['Notifications', '/provider/notifications'],
  ['Settings', '/provider/settings'],
];

export default function ProviderProfile() {
  const router = useRouter();
  const signOut = useAppStore((s) => s.signOut);
  const setRole = useAppStore((s) => s.setRole);
  return (
    <Screen title="Profile" onBack={false}>
      <Avatar name="Ravi Kumar" uri="https://i.pravatar.cc/150?u=p1" size={72} />
      <Text variant="h4">Ravi Kumar</Text>
      <Text variant="caption" muted>Verified provider</Text>
      <Divider />
      {links.map(([label, href]) => (
        <Button key={href} title={label} variant="ghost" onPress={() => router.push(href as any)} />
      ))}
      <Button title="Switch to customer demo" variant="secondary" onPress={() => { setRole('customer'); router.replace('/(customer)'); }} />
      <Button title="Sign out" variant="destructive" onPress={() => { signOut(); router.replace('/welcome'); }} />
    </Screen>
  );
}
`,
);

console.log('Customer + provider tabs done');
