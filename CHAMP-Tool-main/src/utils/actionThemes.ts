// CCFLA Brand Color Palette & Action Theming
// Authentic color definitions derived from the CCFLA Brand Identity

export interface ActionTheme {
  id: number;
  hex: string;
  rgb: string;
  darkHex: string; // High-contrast text variant for WCAG AA compliance
  bgSubtle: string; // ~4% opacity
  bgLight: string; // ~8% opacity
  bgMedium: string; // ~14% opacity
  borderSubtle: string; // ~20% opacity
  borderMedium: string; // ~40% opacity
  borderHover: string; // ~60% opacity
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

export const CCFLA_PALETTE = {
  blue: '#3B877E',       // RGB: 59, 135, 126
  teal: '#5d8d8b',       // RGB: 93, 141, 139
  amber: '#e8983c',      // RGB: 232, 152, 62
  olive: '#9aba75',      // RGB: 154, 186, 117
  plum: '#993e69',       // RGB: 153, 62, 105
  gold: '#f0c763',       // RGB: 240, 199, 99
  steelBlue: '#467d9d',  // RGB: 70, 125, 157
  coral: '#e0514c',      // RGB: 224, 81, 76
};

export const ACTION_THEMES: Record<number, ActionTheme> = {
  1: {
    id: 1,
    hex: '#3B877E',
    rgb: '59, 135, 126',
    darkHex: '#285C55',
    bgSubtle: 'rgba(59, 135, 126, 0.04)',
    bgLight: 'rgba(59, 135, 126, 0.08)',
    bgMedium: 'rgba(59, 135, 126, 0.15)',
    borderSubtle: 'rgba(59, 135, 126, 0.20)',
    borderMedium: 'rgba(59, 135, 126, 0.40)',
    borderHover: 'rgba(59, 135, 126, 0.70)',
    badgeBg: 'rgba(59, 135, 126, 0.08)',
    badgeBorder: 'rgba(59, 135, 126, 0.25)',
    badgeText: '#3B877E',
  },
  2: {
    id: 2,
    hex: '#5d8d8b',
    rgb: '93, 141, 139',
    darkHex: '#386361',
    bgSubtle: 'rgba(93, 141, 139, 0.05)',
    bgLight: 'rgba(93, 141, 139, 0.10)',
    bgMedium: 'rgba(93, 141, 139, 0.18)',
    borderSubtle: 'rgba(93, 141, 139, 0.22)',
    borderMedium: 'rgba(93, 141, 139, 0.45)',
    borderHover: 'rgba(93, 141, 139, 0.75)',
    badgeBg: 'rgba(93, 141, 139, 0.10)',
    badgeBorder: 'rgba(93, 141, 139, 0.30)',
    badgeText: '#386361',
  },
  3: {
    id: 3,
    hex: '#467d9d',
    rgb: '70, 125, 157',
    darkHex: '#2b5a75',
    bgSubtle: 'rgba(70, 125, 157, 0.05)',
    bgLight: 'rgba(70, 125, 157, 0.10)',
    bgMedium: 'rgba(70, 125, 157, 0.18)',
    borderSubtle: 'rgba(70, 125, 157, 0.22)',
    borderMedium: 'rgba(70, 125, 157, 0.45)',
    borderHover: 'rgba(70, 125, 157, 0.75)',
    badgeBg: 'rgba(70, 125, 157, 0.10)',
    badgeBorder: 'rgba(70, 125, 157, 0.30)',
    badgeText: '#2b5a75',
  },
  4: {
    id: 4,
    hex: '#e8983c',
    rgb: '232, 152, 62',
    darkHex: '#b4630a',
    bgSubtle: 'rgba(232, 152, 62, 0.05)',
    bgLight: 'rgba(232, 152, 62, 0.10)',
    bgMedium: 'rgba(232, 152, 62, 0.18)',
    borderSubtle: 'rgba(232, 152, 62, 0.25)',
    borderMedium: 'rgba(232, 152, 62, 0.48)',
    borderHover: 'rgba(232, 152, 62, 0.80)',
    badgeBg: 'rgba(232, 152, 62, 0.10)',
    badgeBorder: 'rgba(232, 152, 62, 0.35)',
    badgeText: '#b4630a',
  },
  5: {
    id: 5,
    hex: '#993e69',
    rgb: '153, 62, 105',
    darkHex: '#78274d',
    bgSubtle: 'rgba(153, 62, 105, 0.05)',
    bgLight: 'rgba(153, 62, 105, 0.10)',
    bgMedium: 'rgba(153, 62, 105, 0.18)',
    borderSubtle: 'rgba(153, 62, 105, 0.22)',
    borderMedium: 'rgba(153, 62, 105, 0.45)',
    borderHover: 'rgba(153, 62, 105, 0.75)',
    badgeBg: 'rgba(153, 62, 105, 0.10)',
    badgeBorder: 'rgba(153, 62, 105, 0.30)',
    badgeText: '#78274d',
  },
  6: {
    id: 6,
    hex: '#9aba75',
    rgb: '154, 186, 117',
    darkHex: '#52752f',
    bgSubtle: 'rgba(154, 186, 117, 0.06)',
    bgLight: 'rgba(154, 186, 117, 0.12)',
    bgMedium: 'rgba(154, 186, 117, 0.20)',
    borderSubtle: 'rgba(154, 186, 117, 0.28)',
    borderMedium: 'rgba(154, 186, 117, 0.50)',
    borderHover: 'rgba(154, 186, 117, 0.85)',
    badgeBg: 'rgba(154, 186, 117, 0.12)',
    badgeBorder: 'rgba(154, 186, 117, 0.38)',
    badgeText: '#52752f',
  },
};

export function getActionTheme(actionId: number | string): ActionTheme {
  const num = typeof actionId === 'string' ? parseInt(actionId, 10) : actionId;
  return ACTION_THEMES[num] || ACTION_THEMES[1];
}
