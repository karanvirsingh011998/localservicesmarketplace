import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  type FlatList as FlatListType,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Text, TextField, IconButton } from '@/components';
import { threads } from '@/mocks/data';
import { useTheme } from '@/theme/ThemeProvider';

const seed = [
  { id: '1', me: false, text: 'Hi, I can reach by 4 PM.' },
  { id: '2', me: true, text: 'Perfect, gate code is 4521.' },
  { id: '3', me: false, text: 'On my way — 10 mins.' },
];

export default function ChatThread() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const thread = threads.find((t) => t.id === id) || threads[0];
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<FlatListType<(typeof seed)[0]>>(null);

  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen title={thread.name} subtitle="Online" onBack scroll={false} padded={false} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[2.5] }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View
              accessibilityLabel={`${item.me ? 'You' : thread.name}: ${item.text}`}
              style={[
                styles.bubble,
                {
                  alignSelf: item.me ? 'flex-end' : 'flex-start',
                  backgroundColor: item.me ? theme.colors.primary : theme.colors.muted,
                  borderRadius: theme.radius.lg,
                  padding: theme.spacing[3],
                  maxWidth: '80%',
                },
              ]}
            >
              <Text color={item.me ? theme.colors.primaryForeground : theme.colors.foreground}>
                {item.text}
              </Text>
            </View>
          )}
        />
        {typing ? (
          <Text variant="caption" muted style={{ paddingHorizontal: theme.spacing[4] }}>
            {thread.name} is typing…
          </Text>
        ) : null}
        <View
          style={[
            styles.composer,
            {
              borderTopColor: theme.colors.border,
              padding: theme.spacing[3],
              gap: theme.spacing[2],
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <TextField
            style={{ flex: 1, minHeight: theme.sizes.controlSm }}
            placeholder="Message"
            value={text}
            onChangeText={setText}
            accessibilityLabel="Message"
          />
          <IconButton
            name="send"
            accessibilityLabel="Send message"
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
  bubble: {},
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
