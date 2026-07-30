import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Text, Card } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';

const faqs = [
  ['How do I book?', 'Choose a service, pick date/time, confirm payment (mock).'],
  ['Can I cancel?', 'Yes — open booking details and tap Cancel.'],
  ['Is this connected to a backend?', 'No. This build is UI-only with mock data.'],
  ['How do themes work?', 'Open Settings to switch light/dark and brand colors.'],
];

export default function FAQ() {
  const theme = useTheme();
  const [open, setOpen] = useState(0);
  return (
    <Screen title="FAQ" onBack>
      {faqs.map(([q, a], i) => {
        const expanded = open === i;
        return (
          <Card key={q} elevated={false}>
            <Pressable
              onPress={() => setOpen(expanded ? -1 : i)}
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text variant="title" style={{ flex: 1 }}>{q}</Text>
              <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={theme.colors.mutedForeground} />
            </Pressable>
            {expanded ? <Text variant="body" muted style={{ marginTop: 8 }}>{a}</Text> : null}
          </Card>
        );
      })}
    </Screen>
  );
}
