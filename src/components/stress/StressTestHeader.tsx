import { View } from 'react-native';
import { T } from '@/src/components/T';

export function StressTestHeader() {
  return (
    <View>
      <T serif size={34}>
        Stress test
      </T>
      <T serif italic size={18} tone="lime" style={{ marginTop: 8, lineHeight: 26 }}>
        if the next decade is quieter than 15%.
      </T>
      <T size={15} tone="muted" style={{ marginTop: 10, lineHeight: 22 }}>
        Same SIP, weaker market paths. Illustrative — not a forecast.
      </T>
    </View>
  );
}
