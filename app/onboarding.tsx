import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button } from '@/components';
import { useTheme } from '@/theme/ThemeProvider';
import { useAppStore } from '@/store/app-store';

const slides = [
  {
    title: 'Local experts, on demand',
    body: 'Book trusted plumbers, electricians, cleaners and more near you.',
  },
  {
    title: 'Track every booking',
    body: 'Live status, chat, and timelines so you always know what is next.',
  },
  {
    title: 'Earn as a pro',
    body: 'Providers manage jobs, earnings, and availability in one place.',
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const listRef = useRef<FlatList>(null);
  const width = Dimensions.get('window').width;

  const finish = () => {
    completeOnboarding();
    router.replace('/welcome');
  };

  return (
    <Screen scroll={false} padded={false} edges={['top', 'bottom']}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={[styles.hero, { height: Dimensions.get('window').height * 0.38 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text variant="display" color={theme.colors.primaryForeground}>
          QuickFix
        </Text>
      </LinearGradient>
      <View style={[styles.content, { padding: theme.spacing[6], gap: theme.spacing[4] }]}>
        <FlatList
          ref={listRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(s) => s.title}
          onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item }) => (
            <Animated.View
              entering={theme.reduceMotion ? undefined : FadeInRight}
              style={{ width, paddingHorizontal: theme.spacing[6], gap: theme.spacing[2.5] }}
            >
              <Text variant="h2">{item.title}</Text>
              <Text variant="body" muted>
                {item.body}
              </Text>
            </Animated.View>
          )}
        />
        <View
          style={styles.dots}
          accessibilityRole="adjustable"
          accessibilityLabel={`Slide ${index + 1} of ${slides.length}`}
        >
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === index ? theme.colors.primary : theme.colors.border,
              }}
            />
          ))}
        </View>
        <Button
          title={index === slides.length - 1 ? 'Get started' : 'Continue'}
          onPress={() => {
            if (index < slides.length - 1) {
              listRef.current?.scrollToIndex({ index: index + 1, animated: !theme.reduceMotion });
              setIndex(index + 1);
            } else finish();
          }}
        />
        <Button title="Skip" variant="ghost" onPress={finish} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, justifyContent: 'flex-end' },
  dots: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
});
