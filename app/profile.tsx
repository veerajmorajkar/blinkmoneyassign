import { useState, type ReactNode } from 'react';
import { Alert, Linking, Switch, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  IconBack,
  IconBell,
  IconChevron,
  IconHelp,
  IconLogout,
  IconMoon,
  IconPerson,
  IconPin,
} from '@/src/components/icons';
import { PressScale } from '@/src/components/PressScale';
import { Screen } from '@/src/components/Screen';
import { T } from '@/src/components/T';
import { useWallet } from '@/src/data/store';
import { color, radius } from '@/src/theme';

const FULL_NAME = 'Veeraj Honaji Morajkar';
const HELP_URL = 'https://wa.me/?text=Hi%20BlinkMoney%2C%20I%20need%20help';
const THEMES = ['System default', 'Dark'] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? 'B';
  const b = parts[parts.length - 1]?.[0] ?? '';
  return (a + (parts.length > 1 ? b : '')).toUpperCase();
}

function Round({ children, onPress }: { children: ReactNode; onPress: () => void }) {
  return (
    <PressScale
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: color.line,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>{children}</View>
    </PressScale>
  );
}

function Glyph({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: color.line,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}

function Row({
  icon,
  label,
  onPress,
  trailing,
}: {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
  trailing: ReactNode;
}) {
  const inner = (
    <View
      style={{
        backgroundColor: color.surface,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: color.line,
        paddingVertical: 12,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <Glyph>{icon}</Glyph>
      <T size={15} weight="med" style={{ flex: 1 }}>
        {label}
      </T>
      {trailing}
    </View>
  );

  if (!onPress) return inner;
  return <PressScale onPress={onPress}>{inner}</PressScale>;
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ gap: 8 }}>
      <T size={11} tone="muted" weight="med" style={{ letterSpacing: 1.4, textTransform: 'uppercase', marginLeft: 2 }}>
        {title}
      </T>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const w = useWallet();
  const [location, setLocation] = useState(true);
  const [theme, setTheme] = useState<(typeof THEMES)[number]>('System default');
  const [accountOpen, setAccountOpen] = useState(false);

  const logout = () => {
    Alert.alert('Log out', 'This is a mock session. You’ll go back to Home.', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => router.replace('/') },
    ]);
  };

  return (
    <Screen tabs={false} gap={28}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Round onPress={() => router.back()}>
          <IconBack color={color.text} />
        </Round>
        <T size={17} weight="med">
          Profile
        </T>
        <Round onPress={logout}>
          <IconLogout color={color.coral} />
        </Round>
      </View>

      <View style={{ alignItems: 'center', gap: 12, paddingTop: 8 }}>
        <View
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            backgroundColor: color.lime,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T size={28} weight="bold" style={{ color: '#111111' }}>
            {initials(FULL_NAME)}
          </T>
        </View>
        <T size={20} weight="med">
          {FULL_NAME}
        </T>
        <View style={{ width: 36, height: 1, backgroundColor: color.line, marginTop: 4 }} />
      </View>

      <Group title="General">
        <Row
          icon={<IconPerson color={color.text} />}
          label="Account details"
          onPress={() => setAccountOpen((v) => !v)}
          trailing={<IconChevron color={color.muted} />}
        />
        {accountOpen ? (
          <View
            style={{
              backgroundColor: color.surface,
              borderRadius: radius.md,
              padding: 16,
              gap: 10,
            }}
          >
            <T size={12} tone="muted">
              Mobile
            </T>
            <T size={14}>+91 98XXX XX241</T>
            <T size={12} tone="muted" style={{ marginTop: 4 }}>
              Email
            </T>
            <T size={14}>veeraj@blinkmoney.in</T>
            <T size={12} tone="muted" style={{ marginTop: 4 }}>
              PAN
            </T>
            <T size={14}>XXXXX{w.name.slice(0, 1).toUpperCase()}1234F</T>
          </View>
        ) : null}
      </Group>

      <Group title="Settings">
        <Row
          icon={<IconBell color={color.text} />}
          label="Push notifications"
          trailing={
            <Switch
              value={w.notify}
              onValueChange={() => w.dispatch({ type: 'toggleNotify' })}
              trackColor={{ false: color.line, true: color.lime }}
              thumbColor="#111111"
              ios_backgroundColor={color.line}
            />
          }
        />
        <Row
          icon={<IconPin color={color.text} />}
          label="Location access"
          trailing={
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: color.line, true: color.lime }}
              thumbColor="#111111"
              ios_backgroundColor={color.line}
            />
          }
        />
        <Row
          icon={<IconMoon color={color.text} />}
          label="Theme"
          onPress={() => setTheme((t) => (t === 'Dark' ? 'System default' : 'Dark'))}
          trailing={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <T size={13} tone="muted">
                {theme}
              </T>
              <IconChevron color={color.muted} />
            </View>
          }
        />
      </Group>

      <Group title="Help">
        <Row
          icon={<IconHelp color={color.text} />}
          label="Support and FAQs"
          onPress={() => Linking.openURL(HELP_URL)}
          trailing={<IconChevron color={color.muted} />}
        />
      </Group>
    </Screen>
  );
}
