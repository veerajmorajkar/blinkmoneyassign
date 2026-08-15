import { Text, type TextProps } from 'react-native';
import { color, type as font } from '@/src/theme';

type Tone = 'text' | 'muted' | 'lime' | 'coral';

export function T({
  children,
  size = 15,
  weight = 'reg',
  tone = 'text',
  serif,
  italic,
  style,
  ...rest
}: TextProps & {
  size?: number;
  weight?: 'reg' | 'med' | 'bold';
  tone?: Tone;
  serif?: boolean;
  italic?: boolean;
}) {
  const family = serif
    ? italic
      ? font.serifItalic
      : font.serif
    : weight === 'bold'
      ? font.sansBold
      : weight === 'med'
        ? font.sansMed
        : font.sans;
  const c =
    tone === 'muted' ? color.muted : tone === 'lime' ? color.lime : tone === 'coral' ? color.coral : color.text;

  return (
    <Text {...rest} style={[{ fontFamily: family, fontSize: size, color: c, letterSpacing: serif ? -0.6 : 0 }, style]}>
      {children}
    </Text>
  );
}
