import type { ReactNode } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { motion } from '@/src/theme';

type Props = {
  style?: StyleProp<ViewStyle>;
  haptic?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  children: ReactNode;
};

export function PressScale({ haptic = true, onPress, onPressIn, onPressOut, style, children, disabled }: Props) {
  const s = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={style}
      onPressIn={(e) => {
        s.value = withSpring(0.97, motion.press);
        if (haptic) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        }
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        s.value = withSpring(1, motion.press);
        onPressOut?.(e);
      }}
    >
      <Animated.View style={anim}>{children}</Animated.View>
    </Pressable>
  );
}
