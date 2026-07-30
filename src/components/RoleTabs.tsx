import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';

type Tab = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
  badge?: number;
};

export function RoleTabs({ tabs }: { tabs: Tab[] }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: theme.colors.border,
          height: 56 + Math.max(insets.bottom, 8),
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint={theme.resolved}
            experimentalBlurMethod="dimezisBlurView"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: theme.typography.caption.fontFamily,
          fontSize: 11,
        },
      }}
    >
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarLabel: t.title,
            tabBarAccessibilityLabel: t.title,
            tabBarBadge: t.badge || undefined,
            tabBarIcon: ({ color, focused }) => (
              <MotiView
                animate={{
                  scale: focused && !theme.reduceMotion ? 1.12 : 1,
                  translateY: focused && !theme.reduceMotion ? -2 : 0,
                }}
                transition={{ type: 'spring', damping: 16, stiffness: 240 }}
              >
                <Ionicons name={focused ? t.icon : t.iconOutline} color={color} size={22} />
              </MotiView>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
