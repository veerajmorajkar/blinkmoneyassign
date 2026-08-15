import { useState } from 'react';
import { Share, TextInput, View } from 'react-native';
import { Button } from '@/src/components/Button';
import { Progress } from '@/src/components/Progress';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import { color, radius, type as font } from '@/src/theme';

const CODE = 'AXDY';
const CIRCLE_AVG = 68;
const TOP_SCORE = 82;

function CompareBar({
  label,
  value,
  fill,
  delay,
}: {
  label: string;
  value: number;
  fill: string;
  delay: number;
}) {
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <T size={13} tone="muted">
          {label}
        </T>
        <T size={13} weight="med" style={{ color: fill }}>
          {value}%
        </T>
      </View>
      <Progress value={value / 100} delay={delay} fill={fill} height={8} />
    </View>
  );
}

function Stat({ k, v, hint }: { k: string; v: string; hint?: string }) {
  return (
    <View style={{ flex: 1, gap: 4 }}>
      <T size={12} tone="muted">
        {k}
      </T>
      <T serif size={24}>
        {v}
      </T>
      {hint ? (
        <T size={11} tone="muted">
          {hint}
        </T>
      ) : null}
    </View>
  );
}

export function WealthCircle() {
  const w = useWallet();
  const [name, setName] = useState('');
  const [asking, setAsking] = useState(false);

  if (!w.circle) {
    return (
      <View style={{ gap: 22 }}>
        <View>
          <T serif size={34}>
            Wealth Circle
          </T>
          <T serif italic size={18} tone="lime" style={{ marginTop: 10, lineHeight: 26 }}>
            Who do you want beside you on your wealth journey?
          </T>
          <T size={15} tone="muted" style={{ marginTop: 10, lineHeight: 22 }}>
            Add a friend and compare Momentum, streak, and progress. Balances stay private.
          </T>
        </View>

        <View
          style={{
            backgroundColor: color.surface,
            borderRadius: radius.lg,
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, gap: 6 }}>
            <T size={11} weight="med" tone="lime" style={{ letterSpacing: 1.3 }}>
              YOU
            </T>
            <T serif size={28}>
              {w.momentum}
            </T>
            <T size={13} tone="muted">
              Momentum
            </T>
          </View>
          <View style={{ width: 1, height: 56, backgroundColor: color.line, marginHorizontal: 16 }} />
          <View style={{ flex: 1, gap: 6 }}>
            <T size={11} weight="med" tone="muted" style={{ letterSpacing: 1.3 }}>
              FRIEND
            </T>
            <T serif size={28} tone="muted">
              —
            </T>
            <T size={13} tone="muted">
              Waiting
            </T>
          </View>
        </View>

        {asking ? (
          <View style={{ gap: 12 }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Friend’s name"
              placeholderTextColor={color.muted}
              autoCapitalize="words"
              style={{
                backgroundColor: color.surface,
                borderRadius: radius.md,
                paddingVertical: 14,
                paddingHorizontal: 16,
                color: color.text,
                fontFamily: font.sansMed,
                fontSize: 16,
              }}
            />
            <Button
              label="Send invite"
              onPress={() => {
                const who = name.trim() || 'Aarav';
                w.dispatch({ type: 'addFriend', name: who });
                setAsking(false);
                setName('');
                Share.share({
                  title: 'Wealth Pair',
                  message: `${w.name} invited you to a Wealth Pair on BlinkMoney. Compare Momentum — not money. Code ${CODE}`,
                });
              }}
            />
            <Button label="Cancel" kind="quiet" onPress={() => setAsking(false)} />
          </View>
        ) : (
          <Button label="+ Add a friend" onPress={() => setAsking(true)} />
        )}

        <View
          style={{
            backgroundColor: color.bg,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: color.lime,
            paddingVertical: 18,
            paddingHorizontal: 16,
            alignItems: 'center',
          }}
        >
          <T size={12} tone="muted" weight="med">
            Your code
          </T>
          <T serif size={26} tone="lime" style={{ marginTop: 6, letterSpacing: 4 }}>
            {CODE}
          </T>
        </View>
      </View>
    );
  }

  const f = w.circle;
  const youSip = w.sipOk ? 92 : 48;
  const friendsSip = 76;
  const youHabit = w.sipOk ? 84 : 50;
  const friendsHabit = 65;
  const strongest = youSip >= youHabit ? 'consistency' : 'wealth habit';

  return (
    <View style={{ gap: 28 }}>
      <View>
        <T serif size={34}>
          Wealth Circle
        </T>
        <T size={15} tone="muted" style={{ marginTop: 8 }}>
          With {f.name} · behaviours only, never balances
        </T>
      </View>

      <View>
        <T size={13} weight="med">
          How you’re doing
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
          <T serif size={48} tone="lime">
            {w.momentum}
          </T>
          <T size={18} tone="muted">
            / 100
          </T>
        </View>
      </View>

      <View style={{ gap: 14 }}>
        <T size={13} weight="med">
          Compare your journey
        </T>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Stat k="You" v={`${w.momentum}`} />
          <Stat k="Your circle" v={`${CIRCLE_AVG}`} hint="average" />
          <Stat k="Top score" v={`${TOP_SCORE}`} hint="anonymous" />
        </View>
      </View>

      <View style={{ gap: 18 }}>
        <T size={13} weight="med">
          Your circle
        </T>

        <View style={{ gap: 10 }}>
          <T size={14} weight="med">
            SIP consistency
          </T>
          <CompareBar label="You" value={youSip} fill={color.lime} delay={80} />
          <CompareBar label="Friends" value={friendsSip} fill={color.muted} delay={220} />
        </View>

        <View style={{ gap: 10 }}>
          <T size={14} weight="med">
            Wealth habit
          </T>
          <CompareBar label="You" value={youHabit} fill={color.lime} delay={320} />
          <CompareBar label="Friends" value={friendsHabit} fill={color.muted} delay={460} />
        </View>
      </View>

      <T size={16} weight="med">
        Your strongest habit: {strongest}
      </T>

      <View style={{ gap: 12 }}>
        <Button
          label="Invite more friends"
          onPress={() =>
            Share.share({
              title: 'Wealth Circle',
              message: `Join my Wealth Circle on BlinkMoney. Compare Momentum — not money. Code ${CODE}`,
            })
          }
        />
        <Button label="Leave circle" kind="quiet" onPress={() => w.dispatch({ type: 'leaveCircle' })} />
      </View>
    </View>
  );
}
