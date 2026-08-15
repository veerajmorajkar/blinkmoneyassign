import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Amount } from '@/src/components/Amount';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={{ flex: 1, gap: 4 }}>
      <T size={11} tone="muted">
        {label}
      </T>
      {children}
    </View>
  );
}

export function CurrentPlanSummary({
  daily,
  monthly,
  current,
  goal,
  year,
}: {
  daily: number | null;
  monthly: number;
  current: number;
  goal: number;
  year: number | null;
}) {
  return (
    <View
      style={{
        backgroundColor: color.surface,
        borderRadius: radius.md,
        padding: 14,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Cell label={daily != null ? 'Daily SIP' : 'Monthly SIP'}>
          <Amount value={daily ?? monthly} size={20} />
        </Cell>
        <Cell label="Current value">
          <Amount value={current} size={20} />
        </Cell>
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Cell label="Illustrative goal">
          <Amount value={goal} size={20} />
        </Cell>
        <Cell label="If 15% p.a.*">
          <T serif size={20}>
            {year ?? '30+ yrs'}
          </T>
        </Cell>
      </View>
    </View>
  );
}
