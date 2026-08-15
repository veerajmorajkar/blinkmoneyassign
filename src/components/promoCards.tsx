import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

function Shell({ children, pad = 16 }: { children: ReactNode; pad?: number }) {
  return (
    <LinearGradient
      colors={['#1A2E14', '#0A100A', '#050705']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, padding: pad, overflow: 'hidden' }}
    >
      {children}
    </LinearGradient>
  );
}

function Spark({ size = 8, tone = color.lime, style }: { size?: number; tone?: string; style?: ViewStyle }) {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={tone}
          d="M12 0c.4 4.8 2.4 8.4 7.2 10.2-4.8 1.6-6.8 5.2-7.2 10.8-.4-5.6-2.5-9.2-7.2-10.8C9.5 8.4 11.6 4.8 12 0z"
        />
      </Svg>
    </View>
  );
}

function LimeRule({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: 2, height: 14, borderRadius: 1, backgroundColor: color.lime }} />
      <T size={11} tone="lime" weight="med" style={{ flex: 1 }}>
        {children}
      </T>
    </View>
  );
}

export function CardWave() {
  return (
    <Shell>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        <View style={{ width: 108, justifyContent: 'center' }}>
          <Spark size={7} style={{ position: 'absolute', top: 8, left: 4 }} />
          <Spark size={5} tone="#C8E6A0" style={{ position: 'absolute', top: 28, left: 72 }} />
          <Spark size={6} tone={color.muted} style={{ position: 'absolute', bottom: 20, left: 18 }} />
          <T serif size={28} tone="lime">
            10 Cr+
          </T>
          <T serif size={14} tone="lime">
            SIP accounts
          </T>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <T serif size={16}>
              The wave has started.
            </T>
            <T serif italic size={16} tone="lime">
              Yours hasn't.
            </T>
            <T size={12} tone="muted" style={{ marginTop: 8, lineHeight: 17 }}>
              Crores of Indians already have an active SIP. Every day without one is a day of compounding missed.
            </T>
          </View>
          <LimeRule>SIP accounts grew ~35% last year alone</LimeRule>
        </View>
      </View>
    </Shell>
  );
}

export function CardTwentyOne() {
  return (
    <Shell>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        <View style={{ width: 100, justifyContent: 'center' }}>
          <Spark size={6} tone="#fff" style={{ position: 'absolute', top: 10, left: 70 }} />
          <Spark size={8} style={{ position: 'absolute', bottom: 16, left: 8 }} />
          <T size={11} tone="muted">
            Start with just
          </T>
          <T serif size={36} tone="lime">
            ₹21
          </T>
          <T size={12} tone="lime" weight="med">
            Per day
          </T>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <T serif size={15}>
              Your money is sitting idle.
            </T>
            <T serif italic size={15} tone="lime">
              Make it work from today.
            </T>
            <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 8 }} />
            <T size={12} tone="muted" style={{ lineHeight: 17 }}>
              Zero lock-in. No paperwork. Pause anytime. ₹21/day is all it takes to start.
            </T>
          </View>
          <LimeRule>Roz ₹21. Set karo. Bhool jao.</LimeRule>
        </View>
      </View>
    </Shell>
  );
}

export function CardMultiAsset() {
  return (
    <Shell>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <T serif size={15}>
                Stocks + FD + Gold —
              </T>
              <T serif italic size={15} tone="lime">
                all in one click SIP
              </T>
              <T size={12} tone="muted" style={{ marginTop: 8, lineHeight: 17 }}>
                No fund picking. No research. BlinkMoney allocates across assets automatically.
              </T>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {['AMFI registered', '₹21/day', 'Daily compounding'].map((tag) => (
                <View
                  key={tag}
                  style={{
                    backgroundColor: 'rgba(163,230,53,0.08)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: radius.pill,
                  }}
                >
                  <T size={10} tone="lime" weight="med">
                    {tag}
                  </T>
                </View>
              ))}
            </View>
          </View>
          <View style={{ width: 96, alignItems: 'flex-end', justifyContent: 'center' }}>
            <T serif size={34} tone="lime">
              ~15%
            </T>
            <T size={11} tone="lime" weight="med">
              p.a. returns*
            </T>
            <T size={9} tone="muted" style={{ marginTop: 6 }}>
              *T&C apply
            </T>
          </View>
        </View>
      </View>
    </Shell>
  );
}

export function CardCredit() {
  return (
    <Shell>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        <View style={{ width: 118, justifyContent: 'space-between' }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(163,230,53,0.1)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: radius.pill,
            }}
          >
            <T size={10} tone="lime" weight="med">
              Unlock when you start
            </T>
          </View>
          <View>
            <T serif size={13} tone="lime">
              Instant cash @
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <T serif size={32} tone="lime">
                9.99
              </T>
              <T size={11} tone="lime" weight="med" style={{ marginBottom: 6, marginLeft: 4 }}>
                % p.a.*
              </T>
            </View>
            <T size={9} tone="muted">
              *T&C apply
            </T>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <T serif size={15}>
              Start your SIP.
            </T>
            <T serif size={15}>
              Reach ₹25,000
            </T>
            <T serif italic size={15} tone="lime">
              Unlock instant credit.
            </T>
            <T size={12} tone="muted" style={{ marginTop: 6, lineHeight: 16 }}>
              Borrow against your portfolio without breaking your SIP.
            </T>
          </View>
          <View>
            <View style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(163,230,53,0.15)', overflow: 'hidden' }}>
              <View style={{ width: 8, height: 4, borderRadius: 2, backgroundColor: color.lime }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <T size={10} tone="muted">
                Not started
              </T>
              <T size={10} tone="muted">
                ₹25,000 unlocks
              </T>
            </View>
          </View>
        </View>
      </View>
    </Shell>
  );
}

export function CardCashSip() {
  return (
    <Shell pad={10}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1, gap: 2 }}>
          <T serif size={13}>
            Access instant cash
          </T>
          <T serif italic size={13} tone="lime">
            without selling SIP
          </T>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T serif size={22} tone="lime">
            9.99
          </T>
          <T size={10} weight="med" style={{ marginBottom: 2, marginLeft: 3 }}>
            % p.a.*
          </T>
        </View>
      </View>
    </Shell>
  );
}

export function CardTopFunds() {
  const marks = [
    { l: 'I', bg: '#E85D04' },
    { l: 'S', bg: '#1D4ED8' },
    { l: 'A', bg: '#7F1D1D' },
  ];
  return (
    <Shell pad={10}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flexDirection: 'row', width: 68 }}>
          {marks.map((m, i) => (
            <View
              key={m.l}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: m.bg,
                marginLeft: i === 0 ? 0 : -8,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3 - i,
              }}
            >
              <T size={11} weight="bold" style={{ color: '#fff' }}>
                {m.l}
              </T>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <T serif size={13}>
            Your money invested with
          </T>
          <T serif italic size={13} tone="lime">
            India's top funds
          </T>
        </View>
      </View>
    </Shell>
  );
}

export function CardOneClickSip() {
  return (
    <Shell pad={10}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <T serif size={13}>
            Invest in{' '}
            <T serif italic size={13} tone="lime">
              Stocks + FD + Gold
            </T>
          </T>
          <T serif size={13}>
            with one-click{' '}
            <T serif italic size={13} tone="lime">
              SIP
            </T>
          </T>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T serif size={22} tone="lime">
            ~15
          </T>
          <T size={10} tone="lime" weight="med" style={{ marginBottom: 2, marginLeft: 3 }}>
            % p.a.*
          </T>
        </View>
      </View>
    </Shell>
  );
}

export function CardFiveX() {
  return (
    <Shell>
      <View style={{ flex: 1 }}>
        <T serif size={15}>
          BlinkMoney could have
        </T>
        <T serif italic size={15} tone="lime">
          paid you more last month
        </T>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.28)', borderRadius: 12, padding: 10, justifyContent: 'center' }}>
            <T size={10} tone="muted" style={{ letterSpacing: 0.8 }}>
              SAVINGS A/C
            </T>
            <T size={20} weight="bold" style={{ marginTop: 4 }}>
              ₹62
            </T>
            <T size={10} tone="muted">
              @ 3% p.a.
            </T>
          </View>
          <View style={{ flex: 1, backgroundColor: 'rgba(163,230,53,0.1)', borderRadius: 12, padding: 10, justifyContent: 'center' }}>
            <T size={10} tone="muted" style={{ letterSpacing: 0.8 }}>
              BLINKMONEY
            </T>
            <T size={20} weight="bold" tone="lime" style={{ marginTop: 4 }}>
              ₹312
            </T>
            <T size={10} tone="muted">
              @ ~15% p.a.
            </T>
          </View>
          <View style={{ width: 72, alignItems: 'center', justifyContent: 'center' }}>
            <Spark size={6} style={{ position: 'absolute', top: 4, right: 8 }} />
            <T serif size={28} tone="lime">
              5x
            </T>
            <T serif size={13}>
              Better
            </T>
          </View>
        </View>
        <T size={9} tone="muted" style={{ marginTop: 8 }}>
          *Assumes ₹25,000 avg monthly balance. Indicative. T&C apply.
        </T>
      </View>
    </Shell>
  );
}
