import React, { useState } from 'react';
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
    <Screen title="Chat" subtitle={`Thread ${id}`} onBack scroll={false} padded={false}>
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
