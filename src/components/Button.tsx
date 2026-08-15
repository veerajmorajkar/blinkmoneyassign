import { Text, type StyleProp, type ViewStyle } from 'react-native';
import { PressScale } from '@/src/components/PressScale';
import { color, radius, type as font } from '@/src/theme';

type Kind = 'primary' | 'ghost' | 'quiet';

export function Button({
  label,
  onPress,
  kind = 'primary',
  style,
  disabled,
}: {
  label: string;
  onPress: () => void;
  kind?: Kind;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) {
  const bg = kind === 'primary' ? color.lime : kind === 'ghost' ? 'transparent' : color.surfaceRaised;
  const fg = kind === 'primary' ? '#111111' : color.text;
  const border = kind === 'ghost' ? color.line : 'transparent';

  return (
    <PressScale
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: bg,
          borderRadius: radius.md,
          paddingVertical: 14,
          paddingHorizontal: 18,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: kind === 'ghost' ? 1 : 0,
          borderColor: border,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      <Text style={{ fontFamily: font.sansBold, fontSize: 15, color: fg }}>{label}</Text>
    </PressScale>
  );
}
