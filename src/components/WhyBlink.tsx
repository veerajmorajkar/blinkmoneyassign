import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

const s = { fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Glyph({ d }: { d: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d={d} stroke={color.lime} strokeWidth={1.7} {...s} />
    </Svg>
  );
}

const ITEMS = [
  {
    title: 'Low minimums',
    body: 'Start a SIP from ₹21 a day.',
    d: 'M4 19V10l4 3 4-8 4 6 4-4v12H4z',
  },
  {
    title: 'Hands-off investing',
    body: 'Research, allocation and rebalancing are done for you.',
    d: 'M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8M16 4h4v4M8 20H4v-4',
  },
  {
    title: 'Fully digital',
    body: 'Set up and manage everything in the app.',
    d: 'M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm3 16h4',
  },
  {
    title: 'Instant cash',
    body: 'Borrow against your SIP without selling — once you unlock.',
    d: 'M13 3 6 14h6l-1 7 7-11h-6l1-7z',
  },
  {
    title: 'Low-cost borrowing',
    body: 'Interest only, from 9.99% p.a.* on what you draw.',
    d: 'M12 3v18M8 8h5.5a2.5 2.5 0 0 1 0 5H9m4 0h2.5a2.5 2.5 0 0 1 0 5H8',
  },
  {
    title: 'Inclusive by design',
    body: 'Start with your PAN and a bank account.',
    d: 'M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20v-1.5A3.5 3.5 0 0 1 7.5 15h1M20 20v-1.5A3.5 3.5 0 0 0 16.5 15h-1M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-4 8v-1.2A3.8 3.8 0 0 1 11.8 15h.4A3.8 3.8 0 0 1 16 18.8V20',
  },
];

export function WhyBlink() {
  return (
    <View style={{ gap: 22 }}>
      <T serif size={22}>
        Why BlinkMoney
      </T>

      <View style={{ gap: 2 }}>
        {ITEMS.map((item, i) => (
          <View
            key={item.title}
            style={{
              flexDirection: 'row',
              gap: 14,
              paddingVertical: 14,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: color.line,
            }}
          >
            <View style={{ paddingTop: 2 }}>
              <Glyph d={item.d} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <T size={15} weight="med">
                {item.title}
              </T>
              <T size={13} tone="muted" style={{ lineHeight: 19 }}>
                {item.body}
              </T>
            </View>
          </View>
        ))}
      </View>

      <View style={{ gap: 12 }}>
        <T serif size={22}>
          Built by investors, for investors
        </T>
        <View style={{ backgroundColor: color.surface, borderRadius: radius.lg, padding: 18, gap: 14 }}>
          <T serif italic size={17} style={{ lineHeight: 26 }}>
            India's first all-in-one finance solution platform made for the aspirational rich.
          </T>
          <View>
            <T size={14} weight="med">
              Rishabh Roy
            </T>
            <T size={13} tone="muted">
              Founder, BlinkMoney
            </T>
          </View>
        </View>
      </View>
    </View>
  );
}
