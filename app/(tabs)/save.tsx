import { Image, Linking, View } from 'react-native';
import { Amount } from '@/src/components/Amount';
import { Button } from '@/src/components/Button';
import { PressScale } from '@/src/components/PressScale';
import { Screen } from '@/src/components/Screen';
import { PagerCarousel } from '@/src/components/StackCarousel';
import { Progress } from '@/src/components/Progress';
import { CardCashSip, CardOneClickSip, CardTopFunds } from '@/src/components/promoCards';
import { Segmented } from '@/src/components/Segmented';
import { T } from '@/src/components/T';
import { useWallet, type Frequency, type Years } from '@/src/data/store';
import { rupee } from '@/src/format';
import { color, radius } from '@/src/theme';

const PLANS = [51, 101, 501];
const SPLIT = [
  { name: 'Stocks', pct: 65, fill: color.lime },
  { name: 'FD', pct: 20, fill: color.amber },
  { name: 'Gold', pct: 15, fill: '#E8C872' },
] as const;

function Stepper({ onPress, label }: { onPress: () => void; label: string }) {
  return (
    <PressScale
      onPress={onPress}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: color.lime,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T size={22} weight="bold" style={{ color: '#111111' }}>
        {label}
      </T>
    </PressScale>
  );
}

export default function Save() {
  const w = useWallet();
  const period = w.frequency === 'daily' ? 'day' : 'month';
  const shown = w.frequency === 'daily' ? w.dailySip : w.dailySip * 30;
  const running = w.pending?.status === 'active';

  return (
    <Screen>
      <View>
        <T serif size={34}>
          Save
        </T>
      </View>

      <PagerCarousel
        height={88}
        faces={[
          { id: 'click', node: <CardOneClickSip /> },
          { id: 'funds', node: <CardTopFunds /> },
          { id: 'cash', node: <CardCashSip /> },
        ]}
      />

      <Segmented<Frequency>
        value={w.frequency}
        onChange={(value) => w.dispatch({ type: 'setFrequency', value })}
        options={[
          { key: 'daily', label: 'Daily' },
          { key: 'monthly', label: 'Monthly' },
        ]}
      />

      <View style={{ gap: 16 }}>
        <T size={13} tone="muted" weight="med">
          Set your {w.frequency} SIP
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stepper
            label="−"
            onPress={() => w.dispatch({ type: 'setDaily', value: w.dailySip - 10 })}
          />
          <Amount value={shown} size={48} lime />
          <Stepper
            label="+"
            onPress={() => w.dispatch({ type: 'setDaily', value: w.dailySip + 10 })}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {PLANS.map((n) => {
            const on = w.dailySip === n;
            return (
              <PressScale
                key={n}
                onPress={() => w.dispatch({ type: 'setDaily', value: n })}
                style={{
                  flex: 1,
                  backgroundColor: on ? color.lime : color.surfaceRaised,
                  borderRadius: radius.pill,
                  paddingVertical: 10,
                  alignItems: 'center',
                }}
              >
                <T size={13} weight="bold" style={{ color: on ? '#111111' : color.text }}>
                  {rupee(n)}
                </T>
              </PressScale>
            );
          })}
        </View>
      </View>

      <Segmented<Years>
        value={w.years}
        onChange={(value) => w.dispatch({ type: 'setYears', value })}
        options={[
          { key: 1, label: '1 year' },
          { key: 5, label: '5 years' },
          { key: 10, label: '10 years' },
        ]}
      />

      <View>
        <T size={13} tone="muted" style={{ lineHeight: 20 }}>
          {rupee(shown)} a {period} could grow to
        </T>
        <Amount value={w.projection} size={36} lime style={{ marginTop: 6 }} />
        <T size={12} tone="muted" style={{ marginTop: 6 }}>
          in {w.years} year{w.years > 1 ? 's' : ''} at ~15% p.a.* Illustration only.
        </T>
      </View>

      <View style={{ gap: 16 }}>
        <T size={13} weight="med">
          Scheme
        </T>
        <View
          style={{
            backgroundColor: color.surface,
            borderRadius: radius.lg,
            padding: 16,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../../assets/icici.png')}
                style={{ width: 44, height: 44 }}
                resizeMode="contain"
              />
            </View>
            <T size={14} weight="med" style={{ flex: 1, lineHeight: 20 }}>
              ICICI PRUDENTIAL MULTI-ASSET FUND-GROWTH
            </T>
            <PressScale onPress={() => Linking.openURL('https://www.icicipruamc.com/mutual-fund/icici-prudential-multi-asset-fund')}>
              <T size={13} weight="med" tone="lime">
                Learn more
              </T>
            </PressScale>
          </View>

          <View style={{ height: 1, backgroundColor: color.line }} />

          <View style={{ gap: 14 }}>
            <T size={12} tone="muted" weight="med">
              Fund allocation
            </T>
            {SPLIT.map((row, i) => (
              <View key={row.name} style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <T size={14} weight="med">
                    {row.name}
                  </T>
                  <T size={14} weight="med" style={{ color: row.fill }}>
                    {row.pct}%
                  </T>
                </View>
                <Progress value={row.pct / 100} delay={80 + i * 120} fill={row.fill} height={6} />
              </View>
            ))}
          </View>
        </View>
      </View>

      <T size={13} tone="muted">
        You can modify or pause this SIP anytime.
      </T>

      <Button
        label={running ? 'SIP is running' : `Continue with ${rupee(shown)}/${period} SIP`}
        onPress={() => w.dispatch({ type: 'confirmSip' })}
        disabled={running}
      />

      <T size={11} tone="muted">
        *Assumed ~15% p.a. historical blended. Not a guarantee. T&C apply.
      </T>
    </Screen>
  );
}
