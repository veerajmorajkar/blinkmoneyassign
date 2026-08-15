import { View } from 'react-native';
import { Amount } from '@/src/components/Amount';
import { PressScale } from '@/src/components/PressScale';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

export const SIP_STEPS = [3000, 3500, 4000, 4500, 5000];

export function SipAdjustmentControl({
  value,
  onChange,
  steps = SIP_STEPS,
}: {
  value: number;
  onChange: (n: number) => void;
  steps?: number[];
}) {
  return (
    <View style={{ gap: 12 }}>
      <View>
        <T serif size={22}>
          What you can change
        </T>
        <T size={13} tone="muted" style={{ marginTop: 6, lineHeight: 18 }}>
          Monthly equivalent of the daily SIP.
        </T>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <T size={13} tone="muted">
          Monthly SIP
        </T>
        <Amount value={value} size={28} lime />
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {steps.map((s) => {
          const on = s === value;
          return (
            <PressScale
              key={s}
              onPress={() => onChange(s)}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: radius.sm,
                backgroundColor: on ? color.lime : color.surface,
                alignItems: 'center',
              }}
            >
              <T size={12} weight="bold" style={{ color: on ? '#111111' : color.muted }}>
                {s / 1000}k
              </T>
            </PressScale>
          );
        })}
      </View>
    </View>
  );
}
