import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { PressScale } from '@/src/components/PressScale';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import { rupee } from '@/src/format';
import { color } from '@/src/theme';

function Check({ ink = color.lime, plate = '#111111' }: { ink?: string; plate?: string }) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: plate,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path d="M9.2 16.6 4.8 12.2l1.7-1.7 2.7 2.7 8.3-8.3 1.7 1.7z" fill={ink} />
      </Svg>
    </View>
  );
}

function LiveDot() {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: color.lime,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path d="M4 16.5 10 10l3.5 3.5L20 7" fill="none" stroke="#111111" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M14 7h6v6" fill="none" stroke="#111111" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

function Lock() {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M8 11V8.2a4 4 0 0 1 8 0V11"
          fill="none"
          stroke={color.muted}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <Path d="M6.5 11h11v9.2a1.6 1.6 0 0 1-1.6 1.6H8.1A1.6 1.6 0 0 1 6.5 20.2z" fill={color.muted} />
        <Path d="M12 15.2v2.4" stroke="#141414" strokeWidth={2.2} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

function Arrow() {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 6 }}>
      <Svg width={22} height={28} viewBox="0 0 24 32">
        <Path
          d="M12 2v20"
          fill="none"
          stroke={color.lime}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Path
          d="M5 15.5 12 24l7-8.5"
          fill="none"
          stroke={color.lime}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function Pill({
  children,
  bg,
  onPress,
}: {
  children: ReactNode;
  bg: string;
  onPress?: () => void;
}) {
  const inner = (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: '#111111',
        paddingVertical: 18,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </View>
  );

  if (!onPress) return inner;
  return <PressScale onPress={onPress}>{inner}</PressScale>;
}

export function StillGrowing() {
  const w = useWallet();
  const router = useRouter();

  const growPct = Math.min(100, Math.round((w.invested / w.unlockAt) * 100));
  const remaining = Math.max(0, w.unlockAt - w.invested);
  const sipDaily = w.pending?.amount ?? w.dailySip;
  const monthsLeft = remaining <= 0 ? 0 : Math.max(1, Math.ceil(remaining / (sipDaily * 30)));

  return (
    <View style={{ gap: 12 }}>
      <View>
        <PressScale onPress={() => router.push('/save')}>
          <Pill bg={color.lime}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <T size={26} weight="bold" style={{ color: '#111111' }}>
                Save
              </T>
              <Check />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <T size={18} weight="bold" style={{ color: '#111111' }}>
                {rupee(w.invested)}
              </T>
              <T size={15} style={{ color: '#111111' }}>
                invested
              </T>
            </View>
          </Pill>
        </PressScale>

        <Arrow />

        <Pill bg="#243016">
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <T size={26} weight="bold">
              Grow
            </T>
            <LiveDot />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 8, marginBottom: 12 }}>
            <T size={22} weight="bold" tone="lime">
              {growPct}%
            </T>
            <T size={15} weight="med">
              {rupee(w.invested)}
            </T>
            <T size={14} tone="muted">
              of {rupee(w.unlockAt)}
            </T>
          </View>
          <View
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#111111',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${growPct}%`,
                height: 8,
                backgroundColor: color.lime,
              }}
            />
          </View>
        </Pill>

        <Arrow />

        <PressScale onPress={() => router.push('/borrow')}>
          <Pill bg={color.surface}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <T size={26} weight="bold">
                Borrow
              </T>
              {w.unlocked ? <Check ink="#111111" plate={color.lime} /> : <Lock />}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <T size={18} weight="bold" tone={w.unlocked ? 'lime' : 'text'}>
                {w.unlocked ? rupee(w.creditLeft) : rupee(remaining)}
              </T>
              <T size={15} tone="muted">
                {w.unlocked ? 'available without selling' : 'more growth needed'}
              </T>
            </View>
          </Pill>
        </PressScale>
      </View>

      <View style={{ gap: 6 }}>
        <T serif size={18}>
          {w.unlocked ? 'Credit is open.' : "You're closer than you think."}
        </T>
        <T size={13} tone="muted" style={{ lineHeight: 20 }}>
          {w.unlocked
            ? 'Borrow against your SIP without breaking the compounding.'
            : `Keep your SIP active for another ${monthsLeft} month${monthsLeft === 1 ? '' : 's'} to strengthen your Borrow eligibility.`}
        </T>
      </View>
    </View>
  );
}
