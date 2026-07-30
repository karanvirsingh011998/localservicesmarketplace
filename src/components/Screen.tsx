import React, { type ReactNode } from 'react';
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
  footer?: ReactNode;
  keyboard?: boolean;
  collapsibleHeader?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
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
  footer,
  keyboard = false,
  collapsibleHeader = false,
  edges = ['top'],
}: Props) {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const canCollapse = collapsibleHeader && scroll && !theme.reduceMotion;
  const expandedHeaderHeight = subtitle ? 68 : 56;
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const headerAnimatedStyle = useAnimatedStyle(() =>
    canCollapse
      ? {
          height: interpolate(
            scrollY.value,
            [0, 56],
            [expandedHeaderHeight, 48],
            Extrapolation.CLAMP,
          ),
        }
      : {},
  );
  const subtitleAnimatedStyle = useAnimatedStyle(() =>
    canCollapse
      ? {
          opacity: interpolate(scrollY.value, [0, 30], [1, 0], Extrapolation.CLAMP),
          transform: [
            {
              translateY: interpolate(scrollY.value, [0, 30], [0, -5], Extrapolation.CLAMP),
            },
          ],
        }
      : {},
  );

  const header =
    title || onBack || right ? (
      <Animated.View
        style={[
          styles.header,
          {
            paddingHorizontal: theme.spacing[3],
            paddingVertical: theme.spacing[2],
            gap: theme.spacing[2],
          },
          headerAnimatedStyle,
        ]}
      >
        <View style={[styles.left, { gap: theme.spacing[1] }]}>
          {onBack ? (
            <IconButton
              name="chevron-back"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
            />
          ) : null}
          <View style={{ flex: 1 }}>
            {title ? (
              <Text variant="h4" accessibilityRole="header">
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Animated.View style={subtitleAnimatedStyle}>
                <Text variant="caption" muted>
                  {subtitle}
                </Text>
              </Animated.View>
            ) : null}
          </View>
        </View>
        {right}
      </Animated.View>
    ) : null;

  const body = (
    <View
      style={[
        padded && {
          paddingHorizontal: theme.spacing[5],
          gap: theme.spacing[4],
        },
        style,
        { flexGrow: 1 },
      ]}
    >
      {children}
    </View>
  );

  const content = scroll ? (
    <Animated.ScrollView
      contentContainerStyle={{
        paddingBottom: theme.spacing[8] + (footer ? insets.bottom : 0),
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        ) : undefined
      }
    >
      {body}
    </Animated.ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{body}</View>
  );

  const wrapped = keyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      {content}
      {footer ? (
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: theme.spacing[5],
              paddingTop: theme.spacing[3],
              paddingBottom: Math.max(insets.bottom, theme.spacing[3]),
              borderTopColor: theme.colors.border,
              backgroundColor: theme.colors.background,
              gap: theme.spacing[2],
            },
          ]}
        >
          {footer}
        </View>
      ) : null}
    </KeyboardAvoidingView>
  ) : (
    <>
      {content}
      {footer ? (
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: theme.spacing[5],
              paddingTop: theme.spacing[3],
              paddingBottom: Math.max(insets.bottom, theme.spacing[3]),
              borderTopColor: theme.colors.border,
              backgroundColor: theme.colors.background,
              gap: theme.spacing[2],
            },
          ]}
        >
          {footer}
        </View>
      ) : null}
    </>
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.colors.background }]}
      edges={edges}
    >
      {header}
      {wrapped}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
