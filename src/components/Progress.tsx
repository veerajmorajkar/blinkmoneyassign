import { useEffect } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { color, radius } from '@/src/theme';

export function Progress({
  value,
  delay = 0,
  fill = color.lime,
  height = 6,
}: {
  value: number;
  delay?: number;
  fill?: string;
  height?: number;
}) {
  const t = useSharedValue(0);
  const track = useSharedValue(0);

  useEffect(() => {
    const id = setTimeout(() => {
      t.value = withTiming(Math.min(1, Math.max(0, value)), { duration: 800 });
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay, t]);

  const fillAnim = useAnimatedStyle(() => ({
    width: track.value * t.value,
  }));

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        track.value = e.nativeEvent.layout.width;
      }}
      style={{ height, borderRadius: radius.pill, backgroundColor: color.line, overflow: 'hidden' }}
    >
      <Animated.View style={[{ height, backgroundColor: fill, borderRadius: radius.pill }, fillAnim]} />
    </View>
  );
}
