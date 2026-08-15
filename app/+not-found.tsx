import { T } from '@/src/components/T';
import { Screen } from '@/src/components/Screen';
import { useRouter } from 'expo-router';
import { PressScale } from '@/src/components/PressScale';

export default function NotFound() {
  const router = useRouter();
  return (
    <Screen>
      <T serif size={28}>
        That screen isn’t here.
      </T>
      <PressScale onPress={() => router.replace('/')}>
        <T tone="lime" weight="med">
          Go home
        </T>
      </PressScale>
    </Screen>
  );
}
