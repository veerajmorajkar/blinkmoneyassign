import type { ReactNode } from 'react';
import { View } from 'react-native';
import { AnimInt } from '@/src/components/stress/AnimInt';
import { T } from '@/src/components/T';
import { lakh } from '@/src/format';

function Col({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={{ flex: 1, gap: 4 }}>
      <T size={11} tone="muted">
        {label}
      </T>
      {children}
    </View>
  );
}

export function ScenarioResult({
  baseYear,
  scenYear,
  baseValue,
  scenValue,
  monthDelta,
}: {
  baseYear: number | null;
  scenYear: number | null;
  baseValue: number;
  scenValue: number;
  monthDelta: number;
}) {
  return (
    <View style={{ gap: 12 }}>
      <T serif size={22}>
        What changes?
      </T>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Col label="₹10L">
          {baseYear == null || scenYear == null ? (
            <T size={18} serif>
              30+ yrs
            </T>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5 }}>
              <AnimInt value={baseYear} size={18} serif />
              <T size={13} tone="muted">
                →
              </T>
              <AnimInt value={scenYear} size={18} serif lime={scenYear !== baseYear} />
            </View>
          )}
        </Col>
        <Col label="Delay">
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <T size={18} serif tone={monthDelta > 0 ? 'coral' : 'text'}>
              {monthDelta > 0 ? '+' : ''}
              {monthDelta}
            </T>
            <T size={11} tone="muted">
              mo
            </T>
          </View>
        </Col>
        <Col label="In 12 yrs">
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5 }}>
            <T size={16} serif>
              {lakh(baseValue)}
            </T>
            <T size={13} tone="muted">
              →
            </T>
            <T size={16} serif tone={scenValue < baseValue ? 'coral' : 'lime'}>
              {lakh(scenValue)}
            </T>
          </View>
        </Col>
      </View>
    </View>
  );
}
