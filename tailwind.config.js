/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep graphite background system — not pure black
        ink: {
          950: '#08080b',
          900: '#0b0b10',
          850: '#0e0e15',
          800: '#12121b',
          750: '#161622',
          700: '#1b1b28',
          650: '#222231',
          600: '#2a2a3c',
          500: '#3a3a52',
          400: '#4d4d68',
          300: '#6b6b88',
          200: '#9a9ab2',
          100: '#c5c5d6',
          50: '#e8e8f0',
        },
        // Sophisticated violet accent — restrained
        violet: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d4ccff',
          300: '#b3a3ff',
          400: '#8f72ff',
          500: '#6f4dff',
          600: '#5a2eff',
          700: '#4a1fe6',
          800: '#3d1ab8',
          900: '#321794',
        },
        // Electric blue / restrained cyan
        electric: {
          50: '#eef9ff',
          100: '#d6f0ff',
          200: '#aee3ff',
          300: '#76d0ff',
          400: '#38b8ff',
          500: '#0a96f0',
          600: '#0078ce',
          700: '#0062a5',
          800: '#005288',
          900: '#01456f',
        },
        // Semantic
        success: '#3dd68c',
        warning: '#f5b544',
        error: '#f2555f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.04em',
        'wider': '0.08em',
        'widest': '0.16em',
      },
      lineHeight: {
        'tight': '1.05',
        'snug': '1.15',
        'normal': '1.5',
        'relaxed': '1.7',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
