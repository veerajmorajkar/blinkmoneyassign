import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { PressScale } from '@/src/components/PressScale';
import { Screen } from '@/src/components/Screen';
import { SipCalculator } from '@/src/components/SipCalculator';
import { StillGrowing } from '@/src/components/StillGrowing';
import { StackCarousel } from '@/src/components/StackCarousel';
import { T } from '@/src/components/T';
import { WealthMomentum } from '@/src/components/WealthMomentum';
import { WhyBlink } from '@/src/components/WhyBlink';
import { useWallet } from '@/src/data/store';
import { pct, rupee } from '@/src/format';
import { color, radius, space } from '@/src/theme';

function Stat({ label, value, serif }: { label: string; value: string; serif?: boolean }) {
  return (
    <View style={{ flex: 1 }}>
      <T size={15} tone="muted">
        {label}
      </T>
      <T serif={serif} size={serif ? 30 : 28} weight="med" style={{ marginTop: 8 }}>
        {value}
      </T>
    </View>
  );
}

export default function Home() {
  const w = useWallet();
  const router = useRouter();

  return (
    <Screen gap={32}>
      <Header name={w.name} />

      <View style={{ gap: 28, paddingTop: 8, paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Stat label="Total balance" value={rupee(w.balance)} serif />
          <Stat label="XIRR" value={pct(w.xirr)} serif />
        </View>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Stat label="Invested" value={rupee(w.invested)} serif />
          <Stat label="Lifetime returns" value={rupee(w.marketAdd)} serif />
        </View>
      </View>

      <StackCarousel />

      <WealthMomentum />

      {w.pending ? (
        <View style={{ gap: 10 }}>
          <T size={13} weight="med">
            {w.pending.status === 'failed' ? 'Debit failed' : 'Pending SIP'}
          </T>
          <PressScale onPress={() => router.push('/save')}>
            <View
              style={{
                backgroundColor: w.pending.status === 'failed' ? color.coralDim : color.surface,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: w.pending.status === 'failed' ? color.coral : color.lime,
                paddingVertical: 12,
                paddingHorizontal: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <T size={14} weight="med" numberOfLines={1}>
                  {w.pending.fund}
                </T>
                <T size={12} tone={w.pending.status === 'failed' ? 'coral' : 'muted'}>
                  Daily · {w.pending.status === 'active' ? 'Running' : w.pending.status === 'failed' ? 'Retry needed' : 'Amount selected'}
                </T>
              </View>
              <T size={15} weight="med" tone={w.pending.status === 'failed' ? 'coral' : 'lime'}>
                {rupee(w.pending.amount)}
              </T>
            </View>
          </PressScale>
        </View>
      ) : null}

      <StillGrowing />

      <SipCalculator />

      <WhyBlink />

      <PressScale onPress={() => router.push('/rewards')}>
        <View style={{ backgroundColor: color.surface, borderRadius: radius.lg, paddingVertical: 16, paddingHorizontal: 16, gap: 8 }}>
          <T size={12} weight="med" tone="lime" style={{ letterSpacing: 1.2 }}>
            {w.circle ? 'WEALTH PAIR' : 'BUILD YOUR WEALTH CIRCLE'}
          </T>
          {w.circle ? (
            <T size={15}>
              You and {w.circle.name} · compare Momentum, not money
            </T>
          ) : (
            <T size={15} tone="muted" style={{ lineHeight: 21 }}>
              You’re building your wealth journey alone. Add a friend and compare your progress.
            </T>
          )}
          <T size={14} weight="med" tone="lime">
            {w.circle ? 'Open pair →' : '+ Add a friend'}
          </T>
        </View>
      </PressScale>

      {!w.sipOk ? (
        <Card>
          <T weight="med">Today’s SIP didn’t go through.</T>
          <T tone="muted" size={13} style={{ marginTop: 4 }}>
            Bank declined the debit. Streak pauses until this clears.
          </T>
          <View style={{ flexDirection: 'row', gap: space[2], marginTop: space[3] }}>
            <Button label="Retry" onPress={() => w.dispatch({ type: 'retrySip' })} style={{ flex: 1 }} />
          </View>
        </Card>
      ) : null}

      <T size={11} tone="muted">
        *Assumed ~15% p.a. historical blended. Not a guarantee. T&C apply.
      </T>
    </Screen>
  );
}
