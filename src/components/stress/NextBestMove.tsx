import { View } from 'react-native';
import { Button } from '@/src/components/Button';
import { T } from '@/src/components/T';
import { rupee } from '@/src/format';
import { color, radius } from '@/src/theme';

export function NextBestMove({
  current,
  suggested,
  monthsSooner,
  onExplore,
}: {
  current: number;
  suggested: number;
  monthsSooner: number;
  onExplore: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: color.surface,
        borderRadius: radius.md,
        padding: 18,
        gap: 10,
      }}
    >
      <T size={11} weight="med" tone="lime" style={{ letterSpacing: 1.2, textTransform: 'uppercase' }}>
        Next
      </T>
      <T serif size={22}>
        Step up by {rupee(suggested - current)}
      </T>
      <T size={13} tone="muted" style={{ lineHeight: 19 }}>
        Same path, higher SIP. Simulated ~{monthsSooner} months sooner.
      </T>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <T size={13} tone="muted">
          {rupee(current)}
        </T>
        <T size={13} tone="lime" weight="med">
          {rupee(suggested)}
        </T>
      </View>
      <Button label="Explore step-up SIP" onPress={onExplore} />
    </View>
  );
}
