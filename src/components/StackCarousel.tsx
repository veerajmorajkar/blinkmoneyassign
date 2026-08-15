import { useEffect, type ReactNode } from 'react';
import { View, useWindowDimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { CardCredit, CardFiveX, CardMultiAsset, CardTwentyOne, CardWave } from '@/src/components/promoCards';
import { color, radius, space } from '@/src/theme';

const SPRING = { damping: 18, stiffness: 160, mass: 0.7 };
const AUTO_MS = 4200;

function shortest(index: number, progress: number, count: number) {
  'worklet';
  let d = index - progress;
  const half = count / 2;
  while (d > half) d -= count;
  while (d < -half) d += count;
  return d;
}

function Slide({
  children,
  index,
  progress,
  width,
  height,
  count,
}: {
  children: ReactNode;
  index: number;
  progress: SharedValue<number>;
  width: number;
  height: number;
  count: number;
}) {
  const style = useAnimatedStyle(() => {
    const d = shortest(index, progress.value, count);
    return {
      transform: [{ translateX: d * width }],
      opacity: interpolate(d, [-1, 0, 1], [0.35, 1, 0.35], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width,
          height,
          borderRadius: radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

function Dot({ index, progress, count }: { index: number; progress: SharedValue<number>; count: number }) {
  const style = useAnimatedStyle(() => {
    const d = Math.abs(shortest(index, progress.value, count));
    const w = interpolate(d, [0, 0.55, 1.2], [22, 8, 6], Extrapolation.CLAMP);
    const h = interpolate(d, [0, 1], [6, 6], Extrapolation.CLAMP);
    const y = interpolate(d, [0, 1], [-1, 0], Extrapolation.CLAMP);
    const pulse = interpolate(d, [0, 0.4, 1], [1, 0.92, 1], Extrapolation.CLAMP);
    return {
      width: w,
      height: h,
      borderRadius: 99,
      transform: [{ translateY: y }, { scale: pulse }],
      backgroundColor: interpolateColor(d, [0, 0.7, 1.4], [color.lime, color.limeDim, color.line]),
    };
  });

  return <Animated.View style={style} />;
}

export function PagerCarousel({
  faces,
  height = 196,
}: {
  faces: { id: string; node: ReactNode }[];
  height?: number;
}) {
  const { width: screenW } = useWindowDimensions();
  const width = screenW - space[5] * 2;
  const progress = useSharedValue(0);
  const start = useSharedValue(0);
  const paused = useSharedValue(false);
  const count = faces.length;

  const bump = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.value) return;
      progress.value = withSpring(Math.round(progress.value) + 1, SPRING);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, progress]);

  const pan = Gesture.Pan()
    .activeOffsetX([-16, 16])
    .failOffsetY([-18, 18])
    .onBegin(() => {
      paused.value = true;
      start.value = progress.value;
    })
    .onUpdate((e) => {
      progress.value = start.value - e.translationX / width;
    })
    .onEnd((e) => {
      const next = Math.round(start.value - e.translationX / width - e.velocityX / 2800);
      progress.value = withSpring(next, SPRING);
      runOnJS(bump)();
      paused.value = false;
    });

  return (
    <View style={{ gap: 14 }}>
      <GestureDetector gesture={pan}>
        <View style={{ height, overflow: 'hidden', borderRadius: radius.lg }}>
          {faces.map((face, index) => (
            <Slide key={face.id} index={index} progress={progress} width={width} height={height} count={count}>
              {face.node}
            </Slide>
          ))}
        </View>
      </GestureDetector>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 14, gap: 7 }}>
        {faces.map((face, index) => (
          <Dot key={face.id} index={index} progress={progress} count={count} />
        ))}
      </View>
    </View>
  );
}

export function StackCarousel() {
  return (
    <PagerCarousel
      faces={[
        { id: 'wave', node: <CardWave /> },
        { id: '21', node: <CardTwentyOne /> },
        { id: 'multi', node: <CardMultiAsset /> },
        { id: 'credit', node: <CardCredit /> },
        { id: 'fivex', node: <CardFiveX /> },
      ]}
    />
  );
}
