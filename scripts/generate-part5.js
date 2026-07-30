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

const bookingSteps = `import { StepIndicator } from '@/components';
const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];
`;

write(
  'booking/date.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { useAppStore } from '@/store/app-store';

const dates = ['Thu 30', 'Fri 31', 'Sat 1', 'Sun 2', 'Mon 3'];
const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectDate() {
  const [date, setDate] = useState(dates[0]);
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select date" onBack>
      <StepIndicator steps={steps} current={0} />
      <View style={styles.row}>
        {dates.map((d) => (
          <Chip key={d} label={d} selected={date === d} onPress={() => setDate(d)} />
        ))}
      </View>
      <Button title="Continue" onPress={() => { patch({ date }); router.push('/booking/time'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'booking/time.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button, StepIndicator } from '@/components';
import { timeSlots } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectTime() {
  const [time, setTime] = useState(timeSlots[2]);
  const router = useRouter();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select time" onBack>
      <StepIndicator steps={steps} current={1} />
      <View style={styles.row}>
        {timeSlots.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Button title="Continue" onPress={() => { patch({ time }); router.push('/booking/address'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'booking/address.tsx',
  `import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, StepIndicator } from '@/components';
import { addresses } from '@/mocks/data';
import { useAppStore } from '@/store/app-store';
import { useTheme } from '@/theme/ThemeProvider';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function SelectAddress() {
  const [id, setId] = useState(addresses[0].id);
  const router = useRouter();
  const theme = useTheme();
  const patch = useAppStore((s) => s.patchBookingDraft);
  return (
    <Screen title="Select address" onBack>
      <StepIndicator steps={steps} current={2} />
      {addresses.map((a) => (
        <Pressable
          key={a.id}
          onPress={() => setId(a.id)}
          style={[styles.card, {
            borderColor: id === a.id ? theme.colors.primary : theme.colors.border,
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.lg,
          }]}
        >
          <Text variant="title">{a.label}</Text>
          <Text variant="caption" muted>{a.line1}, {a.city} {a.pin}</Text>
        </Pressable>
      ))}
      <Button title="Add address" variant="secondary" onPress={() => router.push('/booking/add-address')} />
      <Button title="Continue" onPress={() => { patch({ addressId: id }); router.push('/booking/summary'); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ card: { padding: 14, borderWidth: 2, gap: 4 } });
`,
);

write(
  'booking/add-address.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button } from '@/components';
import { useToast } from '@/components';

export default function AddAddress() {
  const router = useRouter();
  const toast = useToast();
  const [label, setLabel] = useState('Home');
  return (
    <Screen title="Add address" onBack>
      <TextField label="Label" value={label} onChangeText={setLabel} />
      <TextField label="Address line" placeholder="House / street" />
      <TextField label="City" placeholder="Bengaluru" />
      <TextField label="PIN code" keyboardType="number-pad" />
      <Button title="Save" onPress={() => { toast.show('Address saved (mock)'); router.back(); }} />
      <Button title="Pick on map" variant="ghost" onPress={() => router.push('/shared/location-picker')} />
    </Screen>
  );
}
`,
);

write(
  'booking/summary.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, TextField, Button, StepIndicator, Divider } from '@/components';
import { useAppStore } from '@/store/app-store';
import { services, providers, addresses } from '@/mocks/data';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];

export default function BookingSummary() {
  const draft = useAppStore((s) => s.bookingDraft);
  const patch = useAppStore((s) => s.patchBookingDraft);
  const router = useRouter();
  const service = services.find((s) => s.id === draft.serviceId) || services[0];
  const provider = providers.find((p) => p.id === draft.providerId) || providers[0];
  const address = addresses.find((a) => a.id === draft.addressId) || addresses[0];
  const [notes, setNotes] = useState(draft.notes || '');

  return (
    <Screen title="Booking summary" onBack>
      <StepIndicator steps={steps} current={3} />
      <Text variant="title">{service.name}</Text>
      <Text variant="body" muted>with {provider.name}</Text>
      <Text variant="body">{draft.date} · {draft.time}</Text>
      <Text variant="caption" muted>{address.line1}</Text>
      <Divider />
      <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="Access instructions, issue details…" multiline />
      <Button title="Upload images (mock)" variant="secondary" onPress={() => patch({ images: ['mock'] })} />
      <Text variant="h4">₹{service.priceFrom}</Text>
      <Button title="Continue to payment" onPress={() => { patch({ notes }); router.push('/booking/payment'); }} />
    </Screen>
  );
}
`,
);

write(
  'booking/payment.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Text, Chip, Button, StepIndicator } from '@/components';
import { useToast } from '@/components';

const steps = ['Date', 'Time', 'Address', 'Summary', 'Pay'];
const methods = ['Cash', 'UPI (mock)', 'Card (mock)'];

export default function Payment() {
  const [method, setMethod] = useState(methods[0]);
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Payment" subtitle="Mock checkout — no real charges" onBack>
      <StepIndicator steps={steps} current={4} />
      <Text variant="body" muted>Choose a payment method for this demo.</Text>
      <View style={styles.row}>
        {methods.map((m) => (
          <Chip key={m} label={m} selected={method === m} onPress={() => setMethod(m)} />
        ))}
      </View>
      <Text variant="h3">₹499</Text>
      <Button
        title="Pay & confirm"
        onPress={() => {
          toast.show('Payment successful (mock)');
          router.replace('/booking/confirmation');
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'booking/confirmation.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button } from '@/components';
import { useAppStore } from '@/store/app-store';

export default function Confirmation() {
  const router = useRouter();
  const draft = useAppStore((s) => s.bookingDraft);
  return (
    <Screen title="Confirm booking" onBack>
      <Text variant="h3">Almost done</Text>
      <Text variant="body" muted>
        {draft.date} at {draft.time}. Tap confirm to finish.
      </Text>
      <Button title="Confirm" onPress={() => router.replace('/booking/success')} />
    </Screen>
  );
}
`,
);

write(
  'booking/success.tsx',
  `import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

export default function Success() {
  const theme = useTheme();
  const router = useRouter();
  const reset = useAppStore((s) => s.resetBookingDraft);
  useEffect(() => { reset(); }, [reset]);
  return (
    <Screen title="Booked!" onBack={false}>
      <View style={styles.center}>
        <Animated.View entering={ZoomIn}>
          <Ionicons name="checkmark-circle" size={88} color={theme.colors.success} />
        </Animated.View>
        <Text variant="h2">Booking confirmed</Text>
        <Text variant="body" muted style={{ textAlign: 'center' }}>
          Your pro has been notified. Track progress anytime.
        </Text>
      </View>
      <Button title="View booking" onPress={() => router.replace('/booking/b1')} />
      <Button title="Go to bookings" variant="secondary" onPress={() => router.replace('/(customer)/bookings')} />
    </Screen>
  );
}
const styles = StyleSheet.create({ center: { alignItems: 'center', gap: 12, paddingVertical: 40 } });
`,
);

write(
  'booking/[id].tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Text, Badge, Button, Divider } from '@/components';
import { bookings } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const timeline = [
  'Booking placed',
  'Provider accepted',
  'Provider on the way',
  'Service started',
  'Service completed',
];

export default function BookingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const router = useRouter();
  const theme = useTheme();
  return (
    <Screen title="Booking details" onBack>
      <View style={styles.row}>
        <Text variant="h4" style={{ flex: 1 }}>{booking.serviceName}</Text>
        <Badge label={booking.status.replace('_', ' ')} />
      </View>
      <Text variant="body">{booking.providerName}</Text>
      <Text variant="caption" muted>{booking.date} · {booking.time}</Text>
      <Text variant="caption" muted>{booking.address}</Text>
      <Text variant="title">₹{booking.price}</Text>
      <Divider />
      <Text variant="h4">Timeline</Text>
      {timeline.map((step, i) => (
        <View key={step} style={styles.step}>
          <View style={[styles.dot, { backgroundColor: i < 3 ? theme.colors.primary : theme.colors.border }]} />
          <Text variant="body" muted={i >= 3}>{step}</Text>
        </View>
      ))}
      <Button title="Chat" onPress={() => router.push('/chat/m1')} />
      <Button title="Reschedule" variant="secondary" onPress={() => router.push(\`/booking/reschedule?id=\${booking.id}\`)} />
      <Button title="Cancel" variant="ghost" onPress={() => router.push(\`/booking/cancel?id=\${booking.id}\`)} />
      <Button title="Active booking view" variant="ghost" onPress={() => router.push('/booking/active')} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
`,
);

write(
  'booking/active.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, Text, Button, Badge } from '@/components';

export default function ActiveBooking() {
  const router = useRouter();
  return (
    <Screen title="Active booking" onBack>
      <Badge label="In progress" />
      <Text variant="h3">Pipe Leak Repair</Text>
      <Text variant="body" muted>Ravi is on site · started 4:05 PM</Text>
      <Button title="Open timeline" onPress={() => router.push('/booking/timeline')} />
      <Button title="Chat with provider" variant="secondary" onPress={() => router.push('/chat/m1')} />
    </Screen>
  );
}
`,
);

write(
  'booking/timeline.tsx',
  `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const events = [
  { t: '3:40 PM', l: 'Booking accepted' },
  { t: '3:55 PM', l: 'Provider en route' },
  { t: '4:05 PM', l: 'Service started' },
];

export default function Timeline() {
  const theme = useTheme();
  return (
    <Screen title="Booking timeline" onBack>
      {events.map((e) => (
        <View key={e.t} style={[styles.row, { borderLeftColor: theme.colors.primary }]}>
          <Text variant="caption" muted>{e.t}</Text>
          <Text variant="body">{e.l}</Text>
        </View>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: { paddingLeft: 14, borderLeftWidth: 3, marginBottom: 16, gap: 4 },
});
`,
);

write(
  'booking/history.tsx',
  `import React from 'react';
import { useRouter } from 'expo-router';
import { Screen, BookingCard } from '@/components';
import { bookings } from '@/mocks/data';

export default function History() {
  const router = useRouter();
  return (
    <Screen title="Booking history" onBack>
      {bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled').map((b) => (
        <BookingCard key={b.id} booking={b} onPress={() => router.push(\`/booking/\${b.id}\`)} />
      ))}
    </Screen>
  );
}
`,
);

write(
  'booking/reschedule.tsx',
  `import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Chip, Button } from '@/components';
import { timeSlots } from '@/mocks/data';
import { useToast } from '@/components';

export default function Reschedule() {
  const [time, setTime] = useState(timeSlots[4]);
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Reschedule booking" onBack>
      <View style={styles.row}>
        {timeSlots.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
        ))}
      </View>
      <Button title="Confirm new time" onPress={() => { toast.show('Rescheduled (mock)'); router.back(); }} />
    </Screen>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
`,
);

write(
  'booking/cancel.tsx',
  `import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen, TextField, Button, Text } from '@/components';
import { useToast } from '@/components';

export default function CancelBooking() {
  const [reason, setReason] = useState('');
  const router = useRouter();
  const toast = useToast();
  return (
    <Screen title="Cancel booking" onBack>
      <Text variant="body" muted>Tell us why you're cancelling (mock).</Text>
      <TextField label="Reason" value={reason} onChangeText={setReason} multiline />
      <Button title="Cancel booking" variant="destructive" onPress={() => { toast.show('Booking cancelled'); router.replace('/(customer)/bookings'); }} />
    </Screen>
  );
}
`,
);

console.log('Booking flow done');
