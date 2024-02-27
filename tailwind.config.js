/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      textStroke: {
        1: '2px', // здесь вы можете добавить другие варианты, если необходимо
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        text: 'hsl(var(--text))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        bg_section: 'hsl(var(--bg-section))',
        foreground: 'hsl(var(--foreground))',
        badge: 'hsl(var(--badge))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        button: {
          DEFAULT: 'hsl(var(--button-accent))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backdropFilter: {
        'blur-4px': 'blur(4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      backgroundImage: {
        'gradient-dark':
          'linear-gradient(to bottom, rgba(40, 42, 54, 0.8) 0%, rgb(40, 42, 54) 100%)',
        'gradient-light':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 1) 100%)',
        'gradient-light-anime':
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 1) 80%)',
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        100: 100,
        999: 999,
        1000: 1000,
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
