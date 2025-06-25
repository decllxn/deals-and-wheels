const lightAccent = '#e63946'; // dominant red
const lightAccentHover = '#d62828';
const lightHighlight = '#ffb4a2';

const darkAccent = '#3b82f6'; // Tailwind blue-500
const darkAccentHover = '#2563eb';
const darkHighlight = '#60a5fa';

export const Colors = {
  light: {
    text: '#000000',
    background: '#fdfdfd',
    surface: '#ffffff',
    border: '#dddddd',
    muted: '#555555',
    accent: lightAccent,
    accentHover: lightAccentHover,
    highlight: lightHighlight,
    icon: '#687076',
    tint: lightAccent,
    tabIconDefault: '#687076',
    tabIconSelected: lightAccent,
  },
  dark: {
    text: '#ffffff',
    background: '#1f1f1f',
    surface: '#2a2a2a',
    border: '#444444',
    muted: '#bbbbbb',
    accent: darkAccent,
    accentHover: darkAccentHover,
    highlight: darkHighlight,
    icon: '#9BA1A6',
    tint: darkAccent,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: darkAccent,
  },
};