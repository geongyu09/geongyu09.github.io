import type { Config } from 'tailwindcss';

const LAYOUT = require('./src/constants/layout').default;

/**
 * geongyu · Design System v1.0
 * 토큰 정의는 src/app/globals.css :root 와 일치합니다.
 * 컬러는 CSS 변수 참조 — .dark 클래스에서 변수를 뒤집어 다크모드를 전환합니다.
 */
const config: Config = {
  darkMode: 'class',
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
          0: 'var(--ink-0)',
          50: 'var(--ink-50)',
          100: 'var(--ink-100)',
          200: 'var(--ink-200)',
          300: 'var(--ink-300)',
          400: 'var(--ink-400)',
          500: 'var(--ink-500)',
          600: 'var(--ink-600)',
          700: 'var(--ink-700)',
          800: 'var(--ink-800)',
          900: 'var(--ink-900)',
          950: 'var(--ink-950)',
        },
        blue: {
          50: 'var(--blue-50)',
          600: 'var(--blue-600)',
          800: 'var(--blue-800)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        display: [
          '66px',
          { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '600' },
        ],
        h1: [
          '46px',
          { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' },
        ],
        h2: [
          '30px',
          { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '600' },
        ],
        h3: [
          '22px',
          { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        lead: ['20px', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        body: ['19px', { lineHeight: '1.75', letterSpacing: '-0.005em' }],
        sm: ['16px', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        caption: ['13px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        code: ['16px', { lineHeight: '1.5', letterSpacing: '0' }],
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
