import { View } from 'react-native';
import { Segmented } from '@/src/components/Segmented';
import { T } from '@/src/components/T';
import { SCENARIOS, type Scenario } from '@/src/stress/calc';

export function ScenarioSelector({
  value,
  onChange,
}: {
  value: Scenario;
  onChange: (v: Scenario) => void;
}) {
  const hint = SCENARIOS.find((s) => s.key === value)?.hint;

  return (
    <View style={{ gap: 12 }}>
      <View>
        <T serif size={22}>
          What if markets change?
        </T>
        <T size={13} tone="muted" style={{ marginTop: 6, lineHeight: 18 }}>
          {hint}
        </T>
      </View>
      <Segmented
        value={value}
        onChange={onChange}
        options={SCENARIOS.map((s) => ({
          key: s.key,
          label: s.key === 'correction' ? 'Dip' : s.label,
        }))}
      />
    </View>
  );
}
