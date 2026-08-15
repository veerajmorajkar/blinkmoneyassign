import { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { IconBorrow, IconGift, IconHome, IconSave, IconStress } from '@/src/components/icons';
import { color } from '@/src/theme';

const TAB_COUNT = 5;

function metrics(screenWidth: number, insetBottom: number) {
  const pillWidth = Math.round(screenWidth * 0.86);
  const slotWidth = pillWidth / TAB_COUNT;
  const refSlot = (screenWidth * 0.86) / 4;
  const circleSize = Math.round(refSlot * 0.62);
  const iconSize = Math.round(circleSize * 0.44);
  const pillPad = Math.round(circleSize * 0.16);
  const pillHeight = circleSize + pillPad * 2;
  return {
    pillWidth,
    slotWidth,
    circleSize,
    iconSize,
    pillPad,
    pillHeight,
    pillRadius: pillHeight / 2,
    reserve: pillHeight + Math.max(insetBottom, 18) + 12,
  };
}

export function tabBarReserve(screenWidth: number, insetBottom: number) {
  const extra = Platform.OS === 'web' ? 28 : 0;
  return metrics(screenWidth, insetBottom).reserve + extra;
}

function circleX(index: number, slotWidth: number, circleSize: number) {
  return index * slotWidth + (slotWidth - circleSize) / 2;
}

function pinToViewport(node: View | null) {
  if (Platform.OS !== 'web' || !node) return;
  const el = node as unknown as HTMLElement;
  if (!el.style) return;
  el.id = 'blink-tabbar';
  el.style.setProperty('position', 'fixed', 'important');
  el.style.setProperty('bottom', '0px', 'important');
  el.style.setProperty('left', '0px', 'important');
  el.style.setProperty('right', '0px', 'important');
  el.style.setProperty('width', '100%', 'important');
  el.style.setProperty('z-index', '99999', 'important');
  el.style.setProperty('display', 'flex', 'important');
}

export function TabBarImpl({
  state,
  navigation,
}: {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (e: { type: 'tabPress'; target: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const m = metrics(width, insets.bottom);
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'web' ? 20 : 18);

  const x = useRef(new Animated.Value(circleX(state.index, m.slotWidth, m.circleSize))).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(x, {
      toValue: circleX(state.index, m.slotWidth, m.circleSize),
      useNativeDriver: true,
      damping: 26,
      stiffness: 130,
      mass: 0.9,
    }).start();

    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 10,
        stiffness: 180,
        mass: 0.6,
      }),
    ]).start();
  }, [state.index, m.slotWidth, m.circleSize, x, scale]);

  const fadeH = m.reserve + 56;

  return (
    <View
      ref={pinToViewport}
      nativeID="blink-tabbar"
      pointerEvents="box-none"
      style={[
        styles.outer,
        {
          height: fadeH,
          paddingBottom: bottomPad,
          zIndex: 9999,
        },
        Platform.OS === 'web'
          ? {
              position: 'fixed' as const,
              bottom: 0,
              left: 0,
              right: 0,
            }
          : null,
      ]}
    >
      <LinearGradient
        pointerEvents="none"
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.35)',
          'rgba(0,0,0,0.72)',
          'rgba(0,0,0,0.92)',
          color.bg,
        ]}
        locations={[0, 0.28, 0.58, 0.82, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.pill,
          {
            width: m.pillWidth,
            height: m.pillHeight,
            borderRadius: m.pillRadius,
            backgroundColor: color.surface,
            borderColor: color.line,
          },
          Platform.select({
            ios: {
              shadowColor: color.lime,
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
            },
            android: { elevation: 16 },
            default: {},
          }),
        ]}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: m.pillPad,
            left: 0,
            width: m.circleSize,
            height: m.circleSize,
            borderRadius: m.circleSize / 2,
            backgroundColor: color.lime,
            transform: [{ translateX: x }, { scale }],
          }}
        />

        {state.routes.map((route, index) => {
          const Icon =
            route.name === 'index'
              ? IconHome
              : route.name === 'save'
                ? IconSave
                : route.name === 'stress'
                  ? IconStress
                  : route.name === 'borrow'
                    ? IconBorrow
                    : IconGift;
          const focused = state.index === index;
          const label =
            route.name === 'index'
              ? 'Home'
              : route.name === 'save'
                ? 'Save'
                : route.name === 'stress'
                  ? 'Stress'
                  : route.name === 'borrow'
                    ? 'Borrow'
                    : 'Rewards';

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                  navigation.navigate(route.name);
                }
              }}
              style={{
                width: m.slotWidth,
                height: m.pillHeight,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={label}
            >
              <Icon
                size={m.iconSize}
                strokeWidth={focused ? 2.5 : 1.5}
                color={focused ? '#111111' : color.muted}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
});
