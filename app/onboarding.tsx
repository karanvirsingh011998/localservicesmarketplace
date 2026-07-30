import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

const slides = [
  { title: 'Local experts, on demand', body: 'Book trusted plumbers, electricians, cleaners and more near you.' },
  { title: 'Track every booking', body: 'Live status, chat, and timelines so you always know what is next.' },
  { title: 'Earn as a pro', body: 'Providers manage jobs, earnings, and availability in one place.' },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const slide = slides[index];

  return (
    <Screen scroll={false} padded={false}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text variant="display" color="#fff">
          QuickFix
        </Text>
      </LinearGradient>
      <View style={styles.content}>
        <Animated.View key={index} entering={FadeInRight} style={styles.copy}>
          <Text variant="h2">{slide.title}</Text>
          <Text variant="body" muted>
            {slide.body}
          </Text>
        </Animated.View>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === index ? theme.colors.primary : theme.colors.border },
              ]}
            />
          ))}
        </View>
        <Button
          title={index === slides.length - 1 ? 'Get started' : 'Continue'}
          onPress={() => {
            if (index < slides.length - 1) setIndex(index + 1);
            else {
              completeOnboarding();
              router.replace('/welcome');
            }
          }}
        />
        <Button
          title="Skip"
          variant="ghost"
          onPress={() => {
            completeOnboarding();
            router.replace('/welcome');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: Dimensions.get('window').height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, padding: 24, gap: 16, justifyContent: 'flex-end' },
  copy: { gap: 10, flex: 1, justifyContent: 'center' },
  dots: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
