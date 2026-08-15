import { View } from 'react-native';
import { T } from '@/src/components/T';

export function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ gap: 6 }}>
      <T serif size={20} style={{ lineHeight: 26 }}>
        {title}
      </T>
      <T size={14} tone="muted" style={{ lineHeight: 21 }}>
        {body}
      </T>
    </View>
  );
}
