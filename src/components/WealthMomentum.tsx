import { useEffect, useRef, useState } from 'react';
import { Share, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { PressScale } from '@/src/components/PressScale';
import { Progress } from '@/src/components/Progress';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import { pct, rupee } from '@/src/format';
import { color, radius, space, type as font } from '@/src/theme';

const AnimCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 120;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

function tone(n: number) {
  if (n >= 80) return { fg: color.lime, dim: color.limeDim };
  if (n >= 60) return { fg: color.amber, dim: color.amberDim };
  return { fg: color.coral, dim: color.coralDim };
}

function Ring({ score, ink }: { score: number; ink: string }) {
  const t = useSharedValue(0);
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);

  useEffect(() => {
    t.value = 0;
    t.value = withDelay(80, withTiming(score / 100, { duration: 900, easing: Easing.out(Easing.cubic) }));
    const from = shownRef.current;
    const t0 = Date.now();
    let frame = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / 900);
      const eased = 1 - (1 - p) * (1 - p);
      const next = Math.round(from + (score - from) * eased);
      shownRef.current = next;
      setShown(next);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, t]);

  const props = useAnimatedProps(() => ({
    strokeDashoffset: CIRC * (1 - t.value),
  }));

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke={color.line} strokeWidth={STROKE} fill="none" />
        <AnimCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={ink}
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
      <T serif size={32} style={{ color: ink }}>
        {shown}
      </T>
      <T size={11} tone="muted">
        / 100
      </T>
    </View>
  );
}

function streakLine(days: number) {
  if (days >= 28) {
    const months = Math.max(1, Math.round(days / 30));
    return `${months} month SIP streak`;
  }
  return `${days}-day SIP streak`;
}

function Signal({
  label,
  value,
  delay,
  ink,
}: {
  label: string;
  value: number;
  delay: number;
  ink: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <T size={13} weight="med">
          {label}
        </T>
        <T size={13} style={{ color: ink }}>
          {value}%
        </T>
      </View>
      <Progress value={value / 100} delay={delay} fill={ink} />
    </View>
  );
}

export function WealthMomentum() {
  const w = useWallet();
  const router = useRouter();

  const consistency = w.sipOk ? 82 : 38;
  const growth = w.lifetimePct > 0 ? 71 : 22;
  const discipline = w.sipOk ? 90 : 42;
  const score = w.momentum;

  const overall = tone(score);
  const bump = w.frequency === 'daily' ? Math.round(500 / 30) : 500;

  return (
    <View style={{ gap: 22 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Ring score={score} ink={overall.fg} />
        <View style={{ flex: 1, gap: 6 }}>
          <T size={13} weight="med" style={{ color: overall.fg }}>
            Your Wealth Momentum
          </T>
          <T size={20} weight="med">
            {score >= 70
              ? "You're building wealth consistently"
              : score >= 40
                ? 'Steady, but it can move faster'
                : 'Your SIP needs a nudge'}
          </T>
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <Signal label="Consistency" value={consistency} delay={120} ink={tone(consistency).fg} />
        <Signal label="Growth" value={growth} delay={220} ink={tone(growth).fg} />
        <Signal label="SIP Discipline" value={discipline} delay={320} ink={tone(discipline).fg} />
      </View>

      <View
        style={{
          backgroundColor: overall.dim,
          borderRadius: radius.lg,
          padding: space[4],
          gap: 12,
        }}
      >
        <T size={13} weight="med" style={{ color: overall.fg }}>
          Your next move
        </T>
        <T size={15} style={{ lineHeight: 22 }}>
          Your SIP consistency is strong, but your monthly contribution has remained unchanged for 6 months.
        </T>
        <PressScale
          onPress={() => {
            w.dispatch({ type: 'setDaily', value: w.dailySip + bump });
            router.push('/save');
          }}
          style={{
            backgroundColor: overall.fg,
            borderRadius: radius.md,
            paddingVertical: 14,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        >
          <T size={15} weight="bold" style={{ color: '#111111', fontFamily: font.sansBold }}>
            Increase SIP by ₹500 →
          </T>
        </PressScale>
      </View>

      <View style={{ gap: 14 }}>
        <T size={13} weight="med">
          Your Wealth Progress
        </T>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <T size={14} tone="muted">
              SIP streak
            </T>
            <T size={14} weight="med">
              {streakLine(w.sipStreak)}
            </T>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <T size={14} tone="muted">
              XIRR
            </T>
            <T size={14} weight="med" tone="lime">
              {pct(w.xirr)}
            </T>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <T size={14} tone="muted">
              Wealth built
            </T>
            <T size={14} weight="med">
              {rupee(w.balance)}
            </T>
          </View>
        </View>
        <T size={13} tone="muted">
          I’m building wealth with BlinkMoney
        </T>
        <PressScale
          onPress={() =>
            Share.share({
              title: 'Wealth Momentum',
              message: `My Wealth Momentum\n\n${score} / 100\n\n${streakLine(w.sipStreak)}\n${pct(w.xirr)} XIRR\n${rupee(w.balance)} wealth built\n\nI'm building wealth with BlinkMoney`,
            })
          }
          style={{
            backgroundColor: color.surfaceRaised,
            borderRadius: radius.md,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <T size={15} weight="bold">
            Share progress
          </T>
        </PressScale>
      </View>
    </View>
  );
}
