import type { Config } from 'tailwindcss';

const LAYOUT = require('./src/constants/layout').default;

/**
 * geongyu · Design System v1.0
 * 토큰 정의는 src/app/globals.css :root 와 일치합니다.
 * Tailwind 유틸로 노출하기 위해 동일 값을 여기서 매핑합니다.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/service/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f4f4f4',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        blue: {
          50: '#e8eeff',
          600: '#2c5eff',
          800: '#1f43c2',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        display: ['64px', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' }],
        h1: ['44px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
        h2: ['28px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        lead: ['18px', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        body: ['17px', { lineHeight: '1.75', letterSpacing: '-0.005em' }],
        sm: ['14px', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        caption: ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        code: ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
      },
      spacing: {
        's-1': '4px',
        's-2': '8px',
        's-3': '12px',
        's-4': '16px',
        's-5': '24px',
        's-6': '32px',
        's-7': '48px',
        's-8': '64px',
        's-9': '88px',
        's-10': '128px',
      },
      maxWidth: {
        container: '1080px',
        reading: '720px',
      },
      borderRadius: {
        'r-0': '0px',
        'r-1': '6px',
        'r-2': '12px',
        pill: '999px',
      },
      minHeight: {
        'fit-to-screen': `calc(100vh - ${LAYOUT.HEADER.height}px - ${LAYOUT.FOOTER.height}px)`,
      },
    },
  },
  plugins: [],
};

export default config;
