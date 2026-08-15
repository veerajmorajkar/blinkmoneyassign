import { Linking, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PressScale } from '@/src/components/PressScale';
import { T } from '@/src/components/T';
import { IconWhatsApp } from '@/src/components/icons';
import { color, radius } from '@/src/theme';

const HELP_URL = 'https://wa.me/?text=Hi%20BlinkMoney%2C%20I%20need%20help';

export function Header({ name }: { name: string }) {
  const router = useRouter();
  const initial = name.trim().charAt(0).toUpperCase() || 'B';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <PressScale onPress={() => router.push('/profile')} style={{ flexShrink: 1, marginRight: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: color.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T size={16} weight="bold" style={{ color: '#111111' }}>
              {initial}
            </T>
          </View>
          <View>
            <T size={16} weight="med">
              Hello {name}
            </T>
            <T size={13} tone="muted">
              Welcome!
            </T>
          </View>
        </View>
      </PressScale>

      <PressScale
        onPress={() => Linking.openURL(HELP_URL)}
        style={{
          backgroundColor: color.lime,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: radius.pill,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <IconWhatsApp color="#111111" size={16} />
          <T size={13} weight="bold" style={{ color: '#111111' }}>
            Help
          </T>
        </View>
      </PressScale>
    </View>
  );
}
