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

function stub(title, body, links = []) {
  const btns = links
    .map((l) => `      <Button title="${l[0]}" variant="ghost" onPress={() => router.push('${l[1]}' as any)} />`)
    .join('\n');
  return `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';

export default function Page() {
  const router = useRouter();
  return (
    <Screen title="${title}" onBack>
      <Text variant="body" muted>${body}</Text>
${btns}
    </Screen>
  );
}
`;
}

// Customer account
write('notifications.tsx', `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const items = [
  ['Booking accepted', 'Ravi accepted your plumbing request'],
  ['Reminder', 'AC service tomorrow at 11:00 AM'],
  ['Offer', 'WELCOME20 expires in 2 days'],
];

export default function Notifications() {
  const theme = useTheme();
  return (
    <Screen title="Notifications" onBack>
      {items.map(([t, s]) => (
        <View key={t} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{t}</Text>
          <Text variant="caption" muted>{s}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 4 } });
`);

write('favorites.tsx', `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, ProviderCard, Text } from '@/components';
import { providers } from '@/mocks/data';

export default function Favorites() {
  const router = useRouter();
  return (
    <Screen title="Favorites" onBack>
      <Text variant="subtitle">Favourite providers</Text>
      {providers.slice(0, 2).map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}
    </Screen>
  );
}
`);

write('addresses.tsx', `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { addresses } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function Addresses() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen title="Saved addresses" onBack>
      {addresses.map((a) => (
        <View key={a.id} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{a.label}</Text>
          <Text variant="caption" muted>{a.line1}, {a.city} {a.pin}</Text>
        </View>
      ))}
      <Button title="Add address" onPress={() => router.push('/booking/add-address')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 4 } });
`);

write('coupons.tsx', `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Button } from '@/components';
import { offers } from '@/mocks/data';
import { useToast } from '@/components';

export default function Coupons() {
  const toast = useToast();
  return (
    <Screen title="Coupons" onBack>
      {offers.map((o) => (
        <View key={o.id} style={[styles.card, { backgroundColor: o.color }]}>
          <Text variant="title" color="#fff">{o.code}</Text>
          <Text variant="caption" color="#fff">{o.title}</Text>
          <Button title="Apply" variant="secondary" onPress={() => toast.show('Coupon applied')} />
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 16, borderRadius: 14, gap: 8 } });
`);

write('rewards.tsx', stub('Rewards', 'You have 420 reward points (mock).', [['Refer & earn', '/refer']]));
write('refer.tsx', `import React from 'react';
import { Screen, Text, Button } from '@/components';
import { useToast } from '@/components';

export default function Refer() {
  const toast = useToast();
  return (
    <Screen title="Refer & earn" onBack>
      <Text variant="h3">Invite friends</Text>
      <Text variant="body" muted>Share code QUICKFIX50 — both get ₹50 credit (mock).</Text>
      <Button title="Copy invite link" onPress={() => toast.show('Link copied')} />
    </Screen>
  );
}
`);

write('profile/edit.tsx', `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function EditProfile() {
  const [name, setName] = useState('Demo Customer');
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Edit profile" onBack>
      <TextField label="Full name" value={name} onChangeText={setName} />
      <TextField label="Email" value="demo@quickfix.app" />
      <TextField label="Phone" value="+91 98765 43210" />
      <Button title="Save" onPress={() => { toast.show('Profile updated'); router.back(); }} />
    </Screen>
  );
}
`);

write('profile/settings.tsx', `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Chip, Button } from '@/components';
import { useAppStore } from '@/store/app-store';
import type { Appearance, BrandTheme } from '@/theme/tokens';

const brands: BrandTheme[] = ['royalBlue', 'emerald', 'amber', 'purple', 'teal', 'rose'];
const appearances: Appearance[] = ['light', 'dark', 'system'];

export default function Settings() {
  const appearance = useAppStore((s) => s.appearance);
  const brand = useAppStore((s) => s.brand);
  const setAppearance = useAppStore((s) => s.setAppearance);
  const setBrand = useAppStore((s) => s.setBrand);
  return (
    <Screen title="Settings" onBack>
      <Text variant="subtitle">Appearance</Text>
      <View style={styles.row}>
        {appearances.map((a) => (
          <Chip key={a} label={a} selected={appearance === a} onPress={() => setAppearance(a)} />
        ))}
      </View>
      <Text variant="subtitle">Brand theme</Text>
      <View style={styles.row}>
        {brands.map((b) => (
          <Chip key={b} label={b} selected={brand === b} onPress={() => setBrand(b)} />
        ))}
      </View>
      <Button title="Privacy policy" variant="ghost" onPress={() => {}} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`);

// Chat
write('chat/[id].tsx', `import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Text, TextField, IconButton, Avatar } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const seed = [
  { id: '1', me: false, text: 'Hi, I can reach by 4 PM.' },
  { id: '2', me: true, text: 'Perfect, gate code is 4521.' },
  { id: '3', me: false, text: 'On my way — 10 mins.' },
];

export default function ChatThread() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState('');

  return (
    <Screen title="Chat" subtitle={\`Thread \${id}\`} onBack scroll={false} padded={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <View style={[styles.bubble, {
              alignSelf: item.me ? 'flex-end' : 'flex-start',
              backgroundColor: item.me ? theme.colors.primary : theme.colors.muted,
            }]}>
              <Text color={item.me ? '#fff' : theme.colors.foreground}>{item.text}</Text>
            </View>
          )}
        />
        <Text variant="caption" muted style={{ paddingHorizontal: 16 }}>Typing… (mock)</Text>
        <View style={[styles.composer, { borderTopColor: theme.colors.border }]}>
          <TextField style={{ flex: 1 }} placeholder="Message" value={text} onChangeText={setText} />
          <IconButton
            name="send"
            accessibilityLabel="Send"
            onPress={() => {
              if (!text.trim()) return;
              setMessages((m) => [...m, { id: String(Date.now()), me: true, text }]);
              setText('');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderTopWidth: StyleSheet.hairlineWidth },
});
`);

// Provider screens
const providerPages = [
  ['provider/requests.tsx', 'New booking requests', 'Accept or decline incoming jobs (mock).'],
  ['provider/analytics.tsx', 'Analytics', 'Weekly jobs, conversion, and rating trends (mock charts).'],
  ['provider/transactions.tsx', 'Transaction history', 'Payouts and job settlements (mock).'],
  ['provider/availability.tsx', 'Availability', 'Toggle online hours and service radius (mock).'],
  ['provider/calendar.tsx', 'Calendar', 'Month view of scheduled jobs (mock).'],
  ['provider/portfolio.tsx', 'Portfolio', 'Before & after gallery for your profile.'],
  ['provider/documents.tsx', 'Upload documents', 'KYC and certificates upload UI (mock).'],
  ['provider/reviews.tsx', 'Customer reviews', 'Ratings left by customers.'],
  ['provider/profile-view.tsx', 'Provider profile', 'Public-facing preview of your profile.'],
  ['provider/edit-profile.tsx', 'Edit profile', 'Update bio, skills, and cover photo.'],
  ['provider/notifications.tsx', 'Notifications', 'Job alerts and payout updates.'],
  ['provider/settings.tsx', 'Settings', 'Provider preferences and privacy.'],
];

for (const [file, title, body] of providerPages) {
  write(file, stub(title, body));
}

write('provider/services/index.tsx', `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { services } from '@/mocks/data';

export default function MyServices() {
  const router = useRouter();
  return (
    <Screen title="My services" onBack>
      {services.slice(0, 3).map((s) => (
        <Button key={s.id} title={\`\${s.name} · ₹\${s.priceFrom}\`} variant="ghost" onPress={() => router.push('/provider/services/edit')} />
      ))}
      <Button title="Add service" onPress={() => router.push('/provider/services/add')} />
    </Screen>
  );
}
`);

write('provider/services/add.tsx', `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function AddService() {
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Add service" onBack>
      <TextField label="Service name" />
      <TextField label="Price from" keyboardType="number-pad" />
      <TextField label="Duration (mins)" keyboardType="number-pad" />
      <TextField label="Description" multiline />
      <Button title="Save" onPress={() => { toast.show('Service added'); router.back(); }} />
    </Screen>
  );
}
`);

write('provider/services/edit.tsx', `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function EditService() {
  const toast = useToast();
  const router = useRouter();
  return (
    <Screen title="Edit service" onBack>
      <TextField label="Service name" value="Pipe Leak Repair" />
      <TextField label="Price from" value="299" keyboardType="number-pad" />
      <Button title="Update" onPress={() => { toast.show('Service updated'); router.back(); }} />
    </Screen>
  );
}
`);

write('provider/jobs/[id].tsx', `import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge } from '@/components';
import { bookings } from '@/mocks/data';

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const router = useRouter();
  return (
    <Screen title="Job details" onBack>
      <Badge label={booking.status.replace('_', ' ')} />
      <Text variant="h4">{booking.serviceName}</Text>
      <Text variant="body">{booking.address}</Text>
      <Text variant="caption" muted>{booking.date} · {booking.time}</Text>
      <Text variant="title">₹{booking.price}</Text>
      <Button title="Accept" onPress={() => {}} />
      <Button title="Start job" variant="secondary" onPress={() => {}} />
      <Button title="Chat" variant="ghost" onPress={() => router.push('/chat/m1')} />
    </Screen>
  );
}
`);

// Shared
write('shared/about.tsx', stub('About QuickFix', 'UI-only demo of a local services marketplace.'));
write('shared/privacy.tsx', stub('Privacy Policy', 'Placeholder privacy policy for the UI demo.'));
write('shared/terms.tsx', stub('Terms & Conditions', 'Placeholder terms for the UI demo.'));
write('shared/help.tsx', stub('Help & Support', 'FAQs and contact options.', [['FAQ', '/shared/faq'], ['Contact us', '/shared/contact']]));
write('shared/contact.tsx', `import React from 'react';
import { Screen, Text, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function Contact() {
  const toast = useToast();
  return (
    <Screen title="Contact us" onBack>
      <Text variant="body" muted>Send a message (mock — nothing is submitted).</Text>
      <TextField label="Subject" />
      <TextField label="Message" multiline />
      <Button title="Send" onPress={() => toast.show('Message sent (mock)')} />
    </Screen>
  );
}
`);
write('shared/faq.tsx', `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const faqs = [
  ['How do I book?', 'Choose a service, pick date/time, confirm payment (mock).'],
  ['Can I cancel?', 'Yes — open booking details and tap Cancel.'],
  ['Is this connected to a backend?', 'No. This build is UI-only with mock data.'],
];

export default function FAQ() {
  const theme = useTheme();
  return (
    <Screen title="FAQ" onBack>
      {faqs.map(([q, a]) => (
        <View key={q} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{q}</Text>
          <Text variant="body" muted>{a}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 6 } });
`);

write('shared/location-picker.tsx', `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Chip } from '@/components';
import { useAppStore } from '@/store/app-store';
import { View, StyleSheet } from 'react-native';

const cities = ['Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi'];

export default function LocationPicker() {
  const [pin, setPin] = useState('560034');
  const setLocationLabel = useAppStore((s) => s.setLocationLabel);
  const router = useRouter();
  return (
    <Screen title="Choose location" onBack>
      <Button title="Use current GPS (mock)" onPress={() => { setLocationLabel('Current location'); router.back(); }} />
      <TextField label="PIN code" value={pin} onChangeText={setPin} keyboardType="number-pad" />
      <View style={styles.row}>
        {cities.map((c) => (
          <Chip key={c} label={c} onPress={() => { setLocationLabel(\`\${c}\`); router.back(); }} />
        ))}
      </View>
      <Button title="Save PIN area" onPress={() => { setLocationLabel(\`PIN \${pin}\`); router.back(); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`);

write('shared/filters.tsx', `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button } from '@/components';

const filters = ['Distance', 'Rating 4+', 'Price', 'Availability', 'Emergency', 'Verified', 'Experience', 'Offers'];

export default function Filters() {
  const [selected, setSelected] = useState(['Distance']);
  const router = useRouter();
  return (
    <Screen title="Filters" onBack>
      <View style={styles.row}>
        {filters.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={selected.includes(f)}
            onPress={() =>
              setSelected((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))
            }
          />
        ))}
      </View>
      <Button title="Apply" onPress={() => router.back()} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`);

write('shared/sort.tsx', `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Button } from '@/components';

export default function Sort() {
  const router = useRouter();
  return (
    <Screen title="Sort" onBack>
      {['Relevance', 'Distance', 'Rating', 'Price'].map((s) => (
        <Button key={s} title={s} variant="ghost" onPress={() => router.back()} />
      ))}
    </Screen>
  );
}
`);

write('shared/image-viewer.tsx', `import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function ImageViewer() {
  const { index } = useLocalSearchParams<{ index?: string }>();
  const i = Number(index || 0);
  return (
    <Screen title="Image" onBack padded={false}>
      <Image source={{ uri: galleryImages[i] || galleryImages[0] }} style={styles.img} resizeMode="contain" />
    </Screen>
  );
}
const styles = StyleSheet.create({
  img: { width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.7 },
});
`);

write('shared/gallery-viewer.tsx', `import React from 'react';
import { Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function GalleryViewer() {
  return (
    <Screen title="Gallery" onBack padded={false}>
      <ScrollView horizontal pagingEnabled>
        {galleryImages.map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.img} resizeMode="cover" />
        ))}
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  img: { width: Dimensions.get('window').width, height: 360 },
});
`);

console.log('Account + provider + shared done');
