import { useEffect, useRef, useState } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import { T } from '@/src/components/T';
import { rupee } from '@/src/format';

type Props = {
  value: number;
  size?: number;
  lime?: boolean;
  serif?: boolean;
  style?: StyleProp<TextStyle>;
};

export function Amount({ value, size = 40, lime, serif = true, style }: Props) {
  const [shown, setShown] = useState(value);
  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    const from = shownRef.current;
    const t0 = Date.now();
    let frame = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - t0) / 480);
      const eased = 1 - (1 - t) * (1 - t);
      setShown(from + (value - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <T serif={serif} size={size} tone={lime ? 'lime' : 'text'} style={[{ fontVariant: ['tabular-nums'] }, style]}>
      {rupee(shown)}
    </T>
  );
}
