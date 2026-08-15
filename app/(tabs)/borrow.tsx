import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Amount } from '@/src/components/Amount';
import { Button } from '@/src/components/Button';
import { Progress } from '@/src/components/Progress';
import { Screen } from '@/src/components/Screen';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import { rupee } from '@/src/format';
import { color, radius, space } from '@/src/theme';

export default function Borrow() {
  const w = useWallet();
  const router = useRouter();
  const maxDraw = Math.floor(w.creditLeft);
  const [ask, setAsk] = useState(Math.min(5_000, Math.max(0, maxDraw)));
  const ratio = Math.min(1, w.invested / w.unlockAt);
  const pct = Math.round(ratio * 100);
  const left = Math.max(0, w.unlockAt - w.invested);
  const steps = useMemo(() => [0.25, 0.5, 0.75, 1].map((p) => Math.round(maxDraw * p)).filter(Boolean), [maxDraw]);

  return (
    <Screen>
      <View>
        <T serif size={34}>
          Borrow
        </T>
        <T serif italic size={18} tone="lime" style={{ marginTop: 8, lineHeight: 26 }}>
          without selling a rupee.
        </T>
        <T size={15} tone="muted" style={{ marginTop: 10, lineHeight: 22 }}>
          Start a SIP and unlock credit at ₹25,000 invested. No credit score. Units stay invested.
        </T>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1, backgroundColor: color.surface, borderRadius: radius.md, padding: 16, gap: 4 }}>
          <T size={12} tone="muted">
            Interest
          </T>
          <T serif size={22} tone="lime">
            9.99%
          </T>
          <T size={12} tone="muted">
            p.a.* · no EMI
          </T>
        </View>
        <View style={{ flex: 1, backgroundColor: color.surface, borderRadius: radius.md, padding: 16, gap: 4 }}>
          <T size={12} tone="muted">
            You can draw
          </T>
          <T serif size={22}>
            50%
          </T>
          <T size={12} tone="muted">
            of invested SIP
          </T>
        </View>
      </View>

      {w.unlocked ? (
        <View style={{ gap: 8 }}>
          <T size={13} weight="med">
            Available without selling
          </T>
          <Amount value={w.creditLeft} size={44} lime />
          <T size={13} tone="muted">
            {rupee(w.drawn)} drawn · lien, not a sale
          </T>
        </View>
      ) : (
        <View style={{ gap: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <T size={13} weight="med">
              Unlocks at {rupee(w.unlockAt)}
            </T>
            <T size={13} tone="lime" weight="med">
              {pct}%
            </T>
          </View>
          <Progress value={ratio} height={8} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <T serif size={20}>
                {rupee(w.invested)}
              </T>
              <T size={12} tone="muted" style={{ marginTop: 2 }}>
                invested
              </T>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <T serif size={20}>
                {rupee(w.unlockAt)}
              </T>
              <T size={12} tone="muted" style={{ marginTop: 2 }}>
                min. to unlock
              </T>
            </View>
          </View>
          <T size={13} tone="muted">
            {rupee(left)} more · about {Math.max(0, Math.ceil(left / (w.pending?.amount ?? w.dailySip)))} days at{' '}
            {rupee(w.pending?.amount ?? w.dailySip)}/day
          </T>
        </View>
      )}

      {w.unlocked ? (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
            {steps.map((n) => (
              <Button
                key={n}
                label={rupee(n)}
                kind={ask === n ? 'primary' : 'quiet'}
                onPress={() => setAsk(n)}
                style={{ minWidth: '22%' }}
              />
            ))}
          </View>
          <T size={15} tone="muted" style={{ lineHeight: 22 }}>
            Draw {rupee(ask)}. Interest only on what you use. No EMI.
          </T>
          <Button
            label="Draw cash"
            onPress={() => {
              w.dispatch({ type: 'draw', value: ask });
              setAsk(0);
            }}
            disabled={ask <= 0 || maxDraw <= 0}
          />
          {w.drawn > 0 ? (
            <Button label="Repay in full" kind="quiet" onPress={() => w.dispatch({ type: 'repay' })} />
          ) : null}
        </>
      ) : (
        <View style={{ gap: 12 }}>
          <Button label="Start SIP · From ₹21/day" onPress={() => router.push('/save')} />
          <T size={13} tone="muted" style={{ textAlign: 'center' }}>
            Instant cash once you unlock. Cancel anytime.
          </T>
        </View>
      )}

      <T size={11} tone="muted">
        *9.99% p.a. on amount drawn. T&C apply.
      </T>
    </Screen>
  );
}
