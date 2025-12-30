import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const primary = {
  50: '#FFF1EB',
  100: '#FFE4D5',
  200: '#FFC7AA',
  300: '#FFA074',
  400: '#FF7A3D',
  500: '#FF5A1F',
  600: '#F04A10',
  700: '#C63A0C',
  800: '#9C2C08',
  900: '#7A2106',
}
const info = {
  500: '#2E74B2',
}
const success = {
  // 500: '#22C55E',
  500: 'FF5A1F',
}

const warning = {
  500: '#F59E0B',
}

const danger = {
  500: '#EF4444',
}

const error = {
  500: '#fa1100',
}
const colorScheme = {
  light: {
    surface: {
      0: '#FFFFFF',
      50: '#F5F7FA',
      100: '#EEF2F7',
      200: '#E5E7EB',
    },
  },
}
export const primeTheme = definePreset(Aura, {
  options: {
    darkModeSelector: 'system',
    cssLayer: true,
  },
  primitive: {
    blue: {
      500: '#2E74B2',
    },
  },
  semantic: {
    primary: primary,
    info: info,
    success,
    warning,
    danger,
    colorScheme,
    error,
  },
})
