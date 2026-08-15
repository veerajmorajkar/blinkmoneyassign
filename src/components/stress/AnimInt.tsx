import { useEffect, useRef, useState } from 'react';
import { T } from '@/src/components/T';

export function AnimInt({
  value,
  size = 16,
  prefix = '',
  suffix = '',
  lime,
  serif,
}: {
  value: number;
  size?: number;
  prefix?: string;
  suffix?: string;
  lime?: boolean;
  serif?: boolean;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef(value);
  ref.current = shown;

  useEffect(() => {
    const from = ref.current;
    const t0 = Date.now();
    let id = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - t0) / 420);
      const e = 1 - (1 - t) * (1 - t);
      setShown(Math.round(from + (value - from) * e));
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <T serif={serif} size={size} tone={lime ? 'lime' : 'text'} style={{ fontVariant: ['tabular-nums'] }}>
      {prefix}
      {shown}
      {suffix}
    </T>
  );
}
