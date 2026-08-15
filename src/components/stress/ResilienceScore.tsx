import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Progress } from '@/src/components/Progress';
import { T } from '@/src/components/T';
import { color } from '@/src/theme';

const AnimCircle = Animated.createAnimatedComponent(Circle);
const SIZE = 104;
const STROKE = 7;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

function Ring({ score }: { score: number }) {
  const t = useSharedValue(score / 100);
  const [shown, setShown] = useState(score);
  const shownRef = useRef(score);

  useEffect(() => {
    t.value = withTiming(score / 100, { duration: 700, easing: Easing.out(Easing.cubic) });
    const from = shownRef.current;
    const t0 = Date.now();
    let id = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / 700);
      const e = 1 - (1 - p) * (1 - p);
      const next = Math.round(from + (score - from) * e);
      shownRef.current = next;
      setShown(next);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [score, t]);

  const props = useAnimatedProps(() => ({
    strokeDashoffset: CIRC * (1 - t.value),
  }));

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={color.line} strokeWidth={STROKE} fill="none" />
        <AnimCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          stroke={color.lime}
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          rotation={-90}
          originX={SIZE / 2}
          originY={SIZE / 2}
          animatedProps={props}
        />
      </Svg>
      <T serif size={28}>
        {shown}
      </T>
      <T size={10} tone="muted">
        / 100
      </T>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={{ gap: 5 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <T size={12} tone="muted">
          {label}
        </T>
        <T size={12} weight="med">
          {value}
        </T>
      </View>
      <Progress value={value / 100} height={3} />
    </View>
  );
}

export function ResilienceScore({
  score,
  consistency,
  timeHorizon,
  contribution,
  goalBuffer,
}: {
  score: number;
  consistency: number;
  timeHorizon: number;
  contribution: number;
  goalBuffer: number;
}) {
  return (
    <View style={{ gap: 14 }}>
      <T serif size={22}>
        Plan check
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Ring score={score} />
        <View style={{ flex: 1, gap: 10 }}>
          <Metric label="Consistency" value={consistency} />
          <Metric label="Time" value={timeHorizon} />
          <Metric label="SIP size" value={contribution} />
          <Metric label="Buffer" value={goalBuffer} />
        </View>
      </View>
      <T size={12} tone="muted" style={{ lineHeight: 17 }}>
        Heuristic under this path — not a rating or predicted return.
      </T>
    </View>
  );
}
