import { View } from 'react-native';
import { PressScale } from '@/src/components/PressScale';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { key: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: color.surfaceRaised,
        borderRadius: radius.md,
        padding: 3,
        gap: 3,
      }}
    >
      {options.map((o) => {
        const on = o.key === value;
        return (
          <PressScale
            key={o.key}
            onPress={() => onChange(o.key)}
            haptic={on ? false : true}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: radius.sm,
              backgroundColor: on ? color.lime : 'transparent',
              alignItems: 'center',
            }}
          >
            <T size={13} weight="bold" style={{ color: on ? '#111111' : color.muted }}>
              {o.label}
            </T>
          </PressScale>
        );
      })}
    </View>
  );
}
