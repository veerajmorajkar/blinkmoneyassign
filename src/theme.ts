export const color = {
  bg: '#000000',
  surface: '#141414',
  surfaceRaised: '#1C1C1C',
  line: '#2A2A2A',
  text: '#F5F5F0',
  muted: '#8A8A82',
  lime: '#A3E635',
  limeDim: '#1C2A0C',
  amber: '#E4C35A',
  amberDim: '#2A2410',
  coral: '#E07A5F',
  coralDim: '#2E1814',
  overlay: 'rgba(0,0,0,0.55)',
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const type = {
  sans: 'DMSans_400Regular',
  sansMed: 'DMSans_500Medium',
  sansBold: 'DMSans_700Bold',
  serif: 'Fraunces_600SemiBold',
  serifItalic: 'Fraunces_600SemiBold_Italic',
} as const;

export const motion = {
  press: { damping: 18, stiffness: 420, mass: 0.35 },
} as const;
