import { View, type ViewProps } from 'react-native';
import { color, radius, space } from '@/src/theme';

export function Card({ children, pad = space[4], style, ...rest }: ViewProps & { pad?: number }) {
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: color.surface,
          borderRadius: radius.lg,
          padding: pad,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
