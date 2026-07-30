import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '@/theme/ThemeProvider';

type StaggeredItemProps = {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
};

export function StaggeredItem({ children, index = 0, style }: StaggeredItemProps) {
  const theme = useTheme();
  const delay = Math.min(index, 10) * theme.motion.listEnterDelay;

  return (
    <MotiView
      from={theme.reduceMotion ? undefined : { opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: theme.reduceMotion ? 0 : theme.motion.cardMs,
        delay: theme.reduceMotion ? 0 : delay,
      }}
      style={style}
    >
      {children}
    </MotiView>
  );
}
