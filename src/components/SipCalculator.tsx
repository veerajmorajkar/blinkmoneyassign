import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Amount } from '@/src/components/Amount';
import { PressScale } from '@/src/components/PressScale';
import { Segmented } from '@/src/components/Segmented';
import { T } from '@/src/components/T';
import { useWallet, type Frequency, type Years } from '@/src/data/store';
import { rupee, sipFutureValue } from '@/src/format';
import { color } from '@/src/theme';

const MIN = 21;
const MAX = 1000;

function clampAmount(n: number) {
  const stepped = Math.round(n / 10) * 10;
  return Math.min(MAX, Math.max(MIN, stepped));
}

function AmountSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const trackW = useSharedValue(1);
  const x = useSharedValue(0);
  const startX = useSharedValue(0);

  const sync = (v: number, w: number) => {
    x.value = ((v - MIN) / (MAX - MIN)) * w;
  };

  useEffect(() => {
    sync(value, trackW.value);
  }, [value, sync, trackW]);

  const emit = (pos: number, w: number) => {
    const t = Math.min(1, Math.max(0, pos / w));
    onChange(clampAmount(MIN + t * (MAX - MIN)));
  };

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const next = Math.min(trackW.value, Math.max(0, e.x));
      x.value = next;
      startX.value = next;
      runOnJS(emit)(next, trackW.value);
    })
    .onUpdate((e) => {
      const next = Math.min(trackW.value, Math.max(0, startX.value + e.translationX));
      x.value = next;
      runOnJS(emit)(next, trackW.value);
    });

  const fill = useAnimatedStyle(() => ({ width: Math.max(0, x.value) }));
  const thumb = useAnimatedStyle(() => ({ left: x.value - 11 }));

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    trackW.value = w;
    sync(value, w);
  };

  return (
    <GestureDetector gesture={pan}>
      <View onLayout={onLayout} style={{ height: 28, justifyContent: 'center' }}>
        <View style={{ height: 4, borderRadius: 2, backgroundColor: color.surfaceRaised, overflow: 'hidden' }}>
          <Animated.View style={[{ height: 4, borderRadius: 2, backgroundColor: color.lime }, fill]} />
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: color.lime,
            },
            thumb,
          ]}
        />
      </View>
    </GestureDetector>
  );
}

export function SipCalculator() {
  const w = useWallet();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(() => Math.min(MAX, w.dailySip));
  const [frequency, setFrequency] = useState<Frequency>(w.frequency);
  const [years, setYears] = useState<Years>(w.years);

  const periodAmt = frequency === 'daily' ? amount : amount * 30;
  const projection = sipFutureValue(amount, years);

  return (
    <View style={{ gap: 16 }}>
      <T serif size={22}>
        SIP Calculator
      </T>

      <View>
        <T size={13} tone="muted" style={{ lineHeight: 20 }}>
          {rupee(periodAmt)} {frequency} for {years} year{years > 1 ? 's' : ''} could grow to
        </T>
        <Amount value={projection} size={40} lime style={{ marginTop: 6 }} />
      </View>

      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <T size={13} weight="med">
            {rupee(amount)} / day
          </T>
          <T size={12} tone="muted">
            ₹21 – ₹1,000
          </T>
        </View>
        <AmountSlider value={amount} onChange={setAmount} />
      </View>

      <Segmented<Frequency>
        value={frequency}
        onChange={setFrequency}
        options={[
          { key: 'daily', label: 'Daily' },
          { key: 'monthly', label: 'Monthly' },
        ]}
      />
      <Segmented<Years>
        value={years}
        onChange={setYears}
        options={[
          { key: 1, label: '1 year' },
          { key: 5, label: '5 years' },
          { key: 10, label: '10 years' },
        ]}
      />

      <PressScale onPress={() => setOpen((v) => !v)}>
        <T size={13} tone="lime" weight="med">
          {open ? 'Hide calculation' : 'How this is calculated'}
        </T>
      </PressScale>
      {open ? (
        <T size={13} tone="muted" style={{ lineHeight: 20 }}>
          Future value of a daily SIP at an assumed 15% p.a., compounded daily. Illustration only — not a
          guarantee. Min ₹21/day. Pause anytime.
        </T>
      ) : null}
    </View>
  );
}
