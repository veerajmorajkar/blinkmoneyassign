import { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { T } from '@/src/components/T';
import { lakh } from '@/src/format';
import { GOAL, START_YEAR } from '@/src/stress/calc';
import { color } from '@/src/theme';

function toLine(data: number[], w: number, h: number, min: number, max: number) {
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / Math.max(1, data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 16) - 8;
    return { x, y, v };
  });
  let d = `M ${pts[0]?.x ?? 0} ${pts[0]?.y ?? h}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`;
  return { d, pts };
}

function lerpArr(a: number[], b: number[], t: number) {
  const n = Math.max(a.length, b.length);
  return Array.from({ length: n }, (_, i) => {
    const x = a[Math.min(i, a.length - 1)] ?? 0;
    const y = b[Math.min(i, b.length - 1)] ?? 0;
    return x + (y - x) * t;
  });
}

export function WealthProjectionChart({
  base,
  scenario,
}: {
  base: number[];
  scenario: number[];
}) {
  const [size, setSize] = useState({ w: 320, h: 156 });
  const [shownBase, setShownBase] = useState(base);
  const [shownScen, setShownScen] = useState(scenario);
  const fromB = useRef(base);
  const fromS = useRef(scenario);
  const [touch, setTouch] = useState<number | null>(null);

  useEffect(() => {
    const a = fromB.current;
    const c = fromS.current;
    const t0 = Date.now();
    let id = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - t0) / 520);
      const e = 1 - (1 - t) * (1 - t);
      setShownBase(lerpArr(a, base, e));
      setShownScen(lerpArr(c, scenario, e));
      if (t < 1) id = requestAnimationFrame(tick);
      else {
        fromB.current = base;
        fromS.current = scenario;
      }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [base, scenario]);

  const { min, max } = useMemo(() => {
    const all = [...shownBase, ...shownScen, GOAL];
    return { min: Math.min(...all) * 0.92, max: Math.max(...all) * 1.06 };
  }, [shownBase, shownScen]);

  const baseL = toLine(shownBase, size.w, size.h, min, max);
  const scenL = toLine(shownScen, size.w, size.h, min, max);
  const goalY = size.h - ((GOAL - min) / (max - min || 1)) * (size.h - 16) - 8;

  const pick = (x: number) => {
    const i = Math.round((x / size.w) * (shownScen.length - 1));
    setTouch(Math.max(0, Math.min(shownScen.length - 1, i)));
  };
  const xSv = useSharedValue(0);

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-16, 16])
    .onBegin((e) => runOnJS(pick)(e.x))
    .onUpdate((e) => {
      xSv.value = e.x;
      runOnJS(pick)(e.x);
    });

  const t = touch;
  const tip = t != null ? scenL.pts[t] : null;

  return (
    <View>
      <GestureDetector gesture={pan}>
        <Animated.View
          collapsable={false}
          onLayout={(e: LayoutChangeEvent) =>
            setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
          }
          style={{ height: 156 }}
        >
          <Svg width="100%" height={156}>
            <Line x1={0} y1={goalY} x2={size.w} y2={goalY} stroke={color.line} strokeDasharray="4 6" />
            <Path d={baseL.d} stroke={color.muted} strokeWidth={1.6} fill="none" />
            <Path d={scenL.d} stroke={color.lime} strokeWidth={2.2} fill="none" strokeLinecap="round" />
            {tip ? <Circle cx={tip.x} cy={tip.y} r={5} fill={color.lime} /> : null}
          </Svg>
        </Animated.View>
      </GestureDetector>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        <T size={11} tone="muted">
          {START_YEAR}
        </T>
        <T size={11} tone="muted">
          ₹10L
        </T>
        <T size={11} tone="muted">
          {START_YEAR + shownScen.length - 1}
        </T>
      </View>
      {tip && t != null ? (
        <T size={13} tone="lime" style={{ marginTop: 8 }}>
          {START_YEAR + t}  ·  {lakh(shownScen[t] ?? 0)}
        </T>
      ) : (
        <T size={12} tone="muted" style={{ marginTop: 8 }}>
          Grey 15%*  ·  Lime this path
        </T>
      )}
    </View>
  );
}
