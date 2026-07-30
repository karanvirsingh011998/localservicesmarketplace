import React, { type ReactNode } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';
import { IconButton } from './IconButton';
import { useRouter } from 'expo-router';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  scroll?: boolean;
  onBack?: boolean;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
  padded?: boolean;
};

export function Screen({
  title,
  subtitle,
  children,
  scroll = true,
  onBack,
  right,
  style,
  refreshing,
  onRefresh,
  padded = true,
}: Props) {
  const theme = useTheme();
  const router = useRouter();
  const header =
    title || onBack || right ? (
      <View style={styles.header}>
        <View style={styles.left}>
          {onBack ? (
            <IconButton
              name="chevron-back"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            {title ? <Text variant="h4">{title}</Text> : null}
            {subtitle ? (
              <Text variant="caption" muted>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        {right}
      </View>
    ) : null;

  const body = (
    <View style={[padded && styles.pad, style, { flex: 1 }]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {header}
      {scroll ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
            ) : undefined
          }
        >
          {body}
        </ScrollView>
      ) : (
        body
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 4 },
  pad: { paddingHorizontal: 20, gap: 16 },
});
