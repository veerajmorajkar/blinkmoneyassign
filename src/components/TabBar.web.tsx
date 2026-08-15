import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { TabBarImpl, tabBarReserve } from '@/src/components/TabBarImpl';

export { tabBarReserve };

export function TabBar(props: Parameters<typeof TabBarImpl>[0]) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.body);
  }, []);

  const bar = <TabBarImpl {...props} />;
  if (root) {
    return createPortal(bar, root) as ReactElement;
  }
  return bar;
}
