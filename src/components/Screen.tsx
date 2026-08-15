import { ScrollView, useWindowDimensions, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tabBarReserve } from '@/src/components/TabBar';
import { color, space } from '@/src/theme';

export function Screen({
  children,
  gap = space[6],
  tabs = true,
  ...rest
}: ScrollViewProps & { children: React.ReactNode; gap?: number; tabs?: boolean }) {
  const inset = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const bottom = tabs ? tabBarReserve(width, inset.bottom) : inset.bottom + space[6];

  return (
    <ScrollView
      {...rest}
      style={[{ flex: 1, backgroundColor: color.bg }, rest.style]}
      contentContainerStyle={[
        {
          paddingTop: inset.top + space[4],
          paddingHorizontal: space[5],
          paddingBottom: bottom + space[4],
        },
        rest.contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ gap }}>{children}</View>
    </ScrollView>
  );
}
