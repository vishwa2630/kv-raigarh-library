/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: 'var(--color-bg-ivory)',
          soft: 'var(--color-bg-ivory-soft)',
          card: 'var(--color-bg-card)',
        },
        navy: {
          DEFAULT: 'var(--color-navy)',
          dark: 'var(--color-navy-dark)',
          light: 'var(--color-navy-light)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          soft: 'var(--color-gold-soft)',
          dark: 'var(--color-gold-dark)',
        },
        saffron: {
          DEFAULT: 'var(--color-saffron)',
          hover: 'var(--color-saffron-hover)',
          dark: 'var(--color-saffron-dark)',
        },
        teal: {
          DEFAULT: 'var(--color-teal)',
          soft: 'var(--color-teal-soft)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
        },
        border: 'var(--color-border)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Noto Sans Devanagari', 'Georgia', 'serif'],
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(11, 42, 91, 0.08), 0 1px 3px rgba(11, 42, 91, 0.05)',
        elevated: '0 12px 28px -8px rgba(11, 42, 91, 0.14)',
      },
    },
  },
  plugins: [],
};
