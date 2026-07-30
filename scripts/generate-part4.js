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
  'search/results.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, ProviderCard, Chip, Button, BottomSheet } from '@/components';
import { providers, services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function SearchResults() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [filters, setFilters] = useState(false);
  const [sort, setSort] = useState(false);
  const query = (q || '').toLowerCase();
  const matchedProviders = providers.filter((p) => !query || p.name.toLowerCase().includes(query) || p.title.toLowerCase().includes(query));
  const matchedServices = services.filter((s) => !query || s.name.toLowerCase().includes(query));

  return (
    <Screen title="Search results" subtitle={q || 'All'} onBack>
      <View style={styles.row}>
        <Chip label="Filters" onPress={() => setFilters(true)} />
        <Chip label="Sort" onPress={() => setSort(true)} />
        <Chip label="Verified" />
        <Chip label="Nearby" />
      </View>
      <Text variant="h4">Services</Text>
      {matchedServices.map((s) => (
        <Button key={s.id} title={\`\${s.name} · from ₹\${s.priceFrom}\`} variant="ghost" onPress={() => router.push(\`/service/\${s.id}\`)} />
      ))}
      <Text variant="h4">Providers</Text>
      {matchedProviders.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}
      <BottomSheet visible={filters} title="Filters" onClose={() => setFilters(false)}>
        {['Distance', 'Rating', 'Price', 'Availability', 'Emergency', 'Verified only'].map((f) => (
          <Chip key={f} label={f} />
        ))}
        <Button title="Apply" onPress={() => setFilters(false)} />
      </BottomSheet>
      <BottomSheet visible={sort} title="Sort by" onClose={() => setSort(false)}>
        {['Relevance', 'Distance', 'Rating', 'Price: low to high'].map((f) => (
          <Button key={f} title={f} variant="ghost" onPress={() => setSort(false)} />
        ))}
      </BottomSheet>
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'category/[id].tsx',
  `import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Chip } from '@/components';
import { categories, subcategories, services } from '@/mocks/data';
import { View, StyleSheet } from 'react-native';

export default function CategoryDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const category = categories.find((c) => c.id === id);
  const subs = subcategories.filter((s) => s.categoryId === id);
  const svcs = services.filter((s) => s.categoryId === id);
  return (
    <Screen title={category?.name || 'Category'} onBack>
      <Text variant="subtitle">Subcategories</Text>
      <View style={styles.row}>
        {subs.map((s) => (
          <Chip key={s.id} label={s.name} onPress={() => router.push({ pathname: '/service', params: { subcategoryId: s.id } })} />
        ))}
      </View>
      <Text variant="subtitle">Services</Text>
      {svcs.map((s) => (
        <Button key={s.id} title={\`\${s.name} · ₹\${s.priceFrom}+\`} variant="ghost" onPress={() => router.push(\`/service/\${s.id}\`)} />
      ))}
      <Button title="Browse providers" onPress={() => router.push('/providers')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'service/index.tsx',
  `import React from 'react';
import { Image, Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text } from '@/components';
import { services } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ServiceListing() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Services" onBack>
      {services.map((s) => (
        <Pressable
          key={s.id}
          onPress={() => router.push(\`/service/\${s.id}\`)}
          style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}
        >
          <Image source={{ uri: s.image }} style={styles.img} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text variant="title">{s.name}</Text>
            <Text variant="caption" muted numberOfLines={2}>{s.description}</Text>
            <Text variant="subtitle">from ₹{s.priceFrom}</Text>
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 12 },
  img: { width: 84, height: 84, borderRadius: 12 },
});
`,
);

write(
  'service/[id].tsx',
  `import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Rating, Badge } from '@/components';
import { services } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

export default function ServiceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((s) => s.id === id) || services[0];
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <Screen title="Service details" onBack>
      <Image source={{ uri: service.image }} style={styles.hero} />
      <Text variant="h3">{service.name}</Text>
      {service.emergency ? <Badge label="Emergency" tone="danger" /> : null}
      <Rating value={service.rating} />
      <Text variant="body" muted>{service.description}</Text>
      <Text variant="title">from ₹{service.priceFrom} · {service.durationMins} mins</Text>
      <Button
        title="Book now"
        onPress={() => {
          patch({ serviceId: service.id });
          if (!isAuthenticated) router.push('/auth/login');
          else router.push('/booking/date');
        }}
      />
      <Button title="View providers" variant="secondary" onPress={() => router.push('/providers')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ hero: { width: '100%', height: 200, borderRadius: 16 } });
`,
);

write(
  'providers/index.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, ProviderCard, Button } from '@/components';
import { providers } from '@/mocks/data';

export default function ProviderListing() {
  const router = useRouter();
  return (
    <Screen title="Providers" onBack>
      <Button title="Filters" variant="secondary" onPress={() => router.push('/shared/filters')} />
      {providers.map((p, i) => (
        <ProviderCard key={p.id} provider={p} index={i} onPress={() => router.push(\`/providers/\${p.id}\`)} />
      ))}
    </Screen>
  );
}
`,
);

write(
  'providers/[id].tsx',
  `import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Button, Badge, Rating, Chip } from '@/components';
import { providers, galleryImages, reviews } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = providers.find((x) => x.id === id) || providers[0];
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <Screen title={p.name} onBack padded={false}>
      <Image source={{ uri: p.cover }} style={styles.cover} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Image source={{ uri: p.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, gap: 4 }}>
            <View style={styles.row}>
              <Text variant="h4">{p.name}</Text>
              {p.verified ? <Badge label="Verified" tone="success" /> : null}
            </View>
            <Text variant="caption" muted>{p.title} · {p.experienceYears} yrs · {p.jobs} jobs</Text>
            <Rating value={p.rating} />
          </View>
        </View>
        <Text variant="body">{p.bio}</Text>
        <View style={styles.row}>{p.languages.map((l) => <Chip key={l} label={l} />)}</View>
        <Text variant="h4">Portfolio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {galleryImages.map((uri) => (
            <Image key={uri} source={{ uri }} style={[styles.thumb, { borderRadius: theme.radius.md }]} />
          ))}
        </ScrollView>
        <Button title="Full gallery" variant="ghost" onPress={() => router.push({ pathname: '/providers/gallery', params: { id: p.id } })} />
        <Button title="Reviews" variant="ghost" onPress={() => router.push({ pathname: '/providers/reviews', params: { id: p.id } })} />
        <Text variant="caption" muted>{reviews.length} recent reviews · ★ {p.rating}</Text>
        <View style={styles.actions}>
          <Button title="Book now" style={{ flex: 1 }} onPress={() => {
            patch({ providerId: p.id });
            if (!isAuthenticated) router.push('/auth/login');
            else router.push('/booking/date');
          }} />
          <Button title="Chat" variant="secondary" style={{ flex: 1 }} onPress={() => router.push('/chat/m1')} />
          <Button title="Call" variant="ghost" style={{ flex: 1 }} onPress={() => {}} />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  cover: { width: '100%', height: 180 },
  body: { padding: 20, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  avatar: { width: 72, height: 72, borderRadius: 36, marginTop: -36, borderWidth: 3, borderColor: '#fff' },
  thumb: { width: 120, height: 90, marginRight: 10 },
  actions: { flexDirection: 'row', gap: 8 },
});
`,
);

write(
  'providers/gallery.tsx',
  `import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components';
import { galleryImages } from '@/mocks/data';

export default function ProviderGallery() {
  const router = useRouter();
  return (
    <Screen title="Gallery" onBack>
      <View style={styles.grid}>
        {galleryImages.map((uri, i) => (
          <Pressable key={uri} onPress={() => router.push({ pathname: '/shared/image-viewer', params: { index: String(i) } })}>
            <Image source={{ uri }} style={styles.img} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  img: { width: 160, height: 120, borderRadius: 12 },
});
`,
);

write(
  'providers/reviews.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Rating } from '@/components';
import { reviews } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProviderReviews() {
  const theme = useTheme();
  return (
    <Screen title="Reviews" onBack>
      {reviews.map((r) => (
        <View key={r.id} style={[styles.card, { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg }]}>
          <Text variant="title">{r.author}</Text>
          <Rating value={r.rating} />
          <Text variant="body">{r.text}</Text>
          <Text variant="caption" muted>{r.date}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, gap: 6 } });
`,
);

write(
  'offers/index.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text, Button } from '@/components';
import { offers } from '@/mocks/data';
import { useToast } from '@/components';

export default function Offers() {
  const toast = useToast();
  return (
    <Screen title="Offers" onBack>
      {offers.map((o) => (
        <View key={o.id} style={[styles.card, { backgroundColor: o.color }]}>
          <Text variant="h4" color="#fff">{o.title}</Text>
          <Text variant="caption" color="#fff">{o.subtitle}</Text>
          <Text variant="title" color="#fff">{o.code} · {o.discount}</Text>
          <Button title="Copy code" variant="secondary" onPress={() => toast.show(\`Copied \${o.code}\`)} />
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 20, borderRadius: 16, gap: 8 } });
`,
);

console.log('Discovery screens done');
