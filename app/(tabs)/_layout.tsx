import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { TabBar } from '@/src/components/TabBar';
import { color } from '@/src/theme';

export default function TabsLayout() {
  return (
    <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: color.bg },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            overflow: 'visible',
            height: Platform.OS === 'web' ? 88 : undefined,
          },
        }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="save" options={{ title: 'Save' }} />
      <Tabs.Screen name="stress" options={{ title: 'Stress' }} />
      <Tabs.Screen name="borrow" options={{ title: 'Borrow' }} />
      <Tabs.Screen name="rewards" options={{ title: 'Share' }} />
    </Tabs>
  );
}
