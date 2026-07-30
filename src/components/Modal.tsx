import React, { type PropsWithChildren, useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  Pressable,
  View,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
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
      <Pressable
        style={[styles.overlay, { backgroundColor: theme.colors.overlay, padding: theme.spacing[6] }]}
        onPress={onClose}
        accessibilityViewIsModal
      >
        <Pressable
          style={[
            {
              backgroundColor: theme.colors.card,
              borderRadius: theme.radius.xl,
              padding: theme.spacing[5],
              gap: theme.spacing[3],
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {(title || true) && (
            <View style={styles.header}>
              {title ? <Text variant="title">{title}</Text> : <View />}
              <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export function BottomSheet({ visible, title, onClose, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<GorhomBottomSheetModal>(null);
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: theme.reduceMotion ? 0 : theme.motion.bottomSheetMs,
    easing: Easing.out(Easing.cubic),
  });

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <GorhomBottomSheetModal
      ref={sheetRef}
      enableDynamicSizing
      enablePanDownToClose
      animationConfigs={animationConfigs}
      onDismiss={onClose}
      backgroundStyle={{ backgroundColor: theme.colors.card }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={theme.resolved === 'dark' ? 0.65 : 0.42}
          pressBehavior="close"
        />
      )}
      accessibilityLabel={title ?? 'Bottom sheet'}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: theme.spacing[5],
          paddingBottom: Math.max(insets.bottom, theme.spacing[5]),
          gap: theme.spacing[3],
        }}
      >
        {title ? (
          <View style={styles.header}>
            <Text variant="title">{title}</Text>
            <IconButton name="close" accessibilityLabel="Close" onPress={onClose} />
          </View>
        ) : null}
        {children}
      </BottomSheetView>
    </GorhomBottomSheetModal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
