import { View } from 'react-native';
import { Button } from '@/src/components/Button';
import { T } from '@/src/components/T';
import { color, radius } from '@/src/theme';

function Block({ title, body, cta, onPress }: { title: string; body: string; cta: string; onPress: () => void }) {
  return (
    <View style={{ paddingVertical: 48, gap: 12 }}>
      <T serif size={28}>
        {title}
      </T>
      <T size={15} tone="muted" style={{ lineHeight: 22 }}>
        {body}
      </T>
      <Button label={cta} onPress={onPress} />
    </View>
  );
}

export function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <Block
      title="Stress test is waiting"
      body="Start a SIP to see how the plan behaves on a weaker path."
      cta="Start a SIP"
      onPress={onStart}
    />
  );
}

export function InsufficientState({ onBack }: { onBack: () => void }) {
  return (
    <Block
      title="Need a little more"
      body="Keep the SIP going to unlock a meaningful path."
      cta="Back to Save"
      onPress={onBack}
    />
  );
}

function Bone({ h, w }: { h: number; w?: `${number}%` | number }) {
  return (
    <View
      style={{
        height: h,
        width: w ?? '100%',
        borderRadius: radius.sm,
        backgroundColor: color.surfaceRaised,
      }}
    />
  );
}

export function LoadingState() {
  return (
    <View style={{ gap: 20, paddingTop: 8 }}>
      <Bone h={36} w="70%" />
      <Bone h={16} w="90%" />
      <Bone h={72} />
      <Bone h={180} />
      <Bone h={96} />
      <Bone h={132} w="40%" />
      <Bone h={88} />
    </View>
  );
}
