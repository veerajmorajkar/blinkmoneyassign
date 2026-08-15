import { Share, View } from 'react-native';
import { Button } from '@/src/components/Button';
import { T } from '@/src/components/T';
import { rupee } from '@/src/format';
import { color, radius } from '@/src/theme';

export function ShareMomentumCard({
  score,
  streakDays,
  daily,
}: {
  score: number;
  streakDays: number;
  daily: number;
}) {
  const line = `${streakDays}-day streak · ${rupee(daily)} / day`;
  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          backgroundColor: color.surface,
          borderRadius: radius.md,
          padding: 20,
          gap: 8,
        }}
      >
        <T size={11} weight="med" tone="lime" style={{ letterSpacing: 1.4, textTransform: 'uppercase' }}>
          Wealth momentum
        </T>
        <T serif size={36}>
          {score} / 100
        </T>
        <T size={13} tone="muted">
          {line}
        </T>
        <T size={13}>SIP still on. Units still invested.</T>
      </View>
      <Button
        kind="ghost"
        label="Share this card"
        onPress={() =>
          Share.share({
            title: 'Wealth Momentum',
            message: `Wealth Momentum ${score}/100 · ${line} · SIP still on with BlinkMoney`,
          })
        }
      />
    </View>
  );
}
