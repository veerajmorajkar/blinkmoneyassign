import Svg, { Path, Rect, Circle } from 'react-native-svg';

const s = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

type IconProps = { color: string; size?: number; strokeWidth?: number };

export function IconHome({ color, size = 22, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconSave({ color, size = 22, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 19V5h11l3 3v11H5z" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M8 19v-6h8v6" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconBorrow({ color, size = 22, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="8.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <Path
        d="M12 7.5v9M9.2 9.8c.7-1 2-1.5 2.8-1.5 1.5 0 2.4.8 2.4 1.9 0 2.6-4.8 1.4-4.8 4.1 0 1.1.9 2 2.5 2 .9 0 2.1-.5 2.7-1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        {...s}
      />
    </Svg>
  );
}

export function IconWhatsApp({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.55 2 2.1 6.45 2.1 11.94c0 1.76.46 3.47 1.34 4.98L2 22l5.23-1.37a9.9 9.9 0 0 0 4.81 1.22h.01c5.49 0 9.94-4.45 9.94-9.94 0-2.65-1.03-5.14-2.94-7zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.21 8.21 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.19-8.25 8.19zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.76.76 2.13.67 2.52.63.39-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.10-.23-.16-.48-.29z"
      />
    </Svg>
  );
}

export function IconStress({ color, size = 22, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 16.5 8 10l3.5 4.5L16 7l5 6" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M3 19h18" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconGift({ color, size = 22, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="4" y="11" width="16" height="9" rx="1.5" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <Path
        d="M4 11h16M12 11v9M12 11c0-3 2.2-5 4-5 0 2-1.6 4.2-4 5M12 11c0-3-2.2-5-4-5 0 2 1.6 4.2 4 5"
        stroke={color}
        strokeWidth={strokeWidth}
        {...s}
      />
    </Svg>
  );
}

export function IconBack({ color, size = 20, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M15 5 8 12l7 7" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconLogout({ color, size = 20, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M10 12h9M16 8l4 4-4 4" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconPerson({ color, size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <Path d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconBell({ color, size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M6 9.5A6 6 0 0 1 18 9.5c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5Z" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M10 18.5a2 2 0 0 0 4 0" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconPin({ color, size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Circle cx="12" cy="11" r="1.8" stroke={color} strokeWidth={strokeWidth} fill="none" />
    </Svg>
  );
}

export function IconMoon({ color, size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M15 3.5A8.2 8.2 0 1 0 20.5 14 6.6 6.6 0 0 1 15 3.5Z" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}

export function IconHelp({ color, size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 18.5 6.2 15A8 8 0 1 1 12 20H5Z" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M9.6 9.2c.4-1.2 1.4-1.8 2.5-1.8 1.4 0 2.4.9 2.4 2.1 0 1.5-1.5 1.8-2.2 2.5-.4.4-.5.9-.5 1.5" stroke={color} strokeWidth={strokeWidth} {...s} />
      <Path d="M11.8 16.2h.01" stroke={color} strokeWidth={2.2} {...s} />
    </Svg>
  );
}

export function IconChevron({ color, size = 16, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth={strokeWidth} {...s} />
    </Svg>
  );
}
