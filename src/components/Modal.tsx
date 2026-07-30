import React, { type PropsWithChildren } from 'react';
import {
  Modal as RNModal,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { IconButton } from './IconButton';

type Props = PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Modal({ visible, title, onClose, children }: Props) {
  const theme = useTheme();
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: theme.colors.overlay }]} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.radius.xl,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text variant="title">{title}</Text>
            <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
          </View>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export function BottomSheet({ visible, title, onClose, children }: Props) {
  const theme = useTheme();
  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={[styles.overlay, { backgroundColor: theme.colors.overlay }]} onPress={onClose}>
        <Pressable
          style={[
            styles.bottom,
            {
              backgroundColor: theme.colors.card,
              borderTopLeftRadius: theme.radius.xl,
              borderTopRightRadius: theme.radius.xl,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[styles.handle, { backgroundColor: theme.colors.border }]} />
          {title ? (
            <View style={styles.header}>
              <Text variant="title">{title}</Text>
              <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
            </View>
          ) : null}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', padding: 24 },
  sheet: { padding: 20, gap: 12 },
  bottom: { marginTop: 'auto', padding: 20, paddingBottom: 36, gap: 12 },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, marginBottom: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
