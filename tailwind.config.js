/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        'background-custom': 'hsl(var(--background-custom))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
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
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        success: 'hsl(var(--success))',
        dark: 'hsl(var(--gray-500))',
        medium: 'hsl(var(--gray-400))',
        light: 'hsl(var(--gray-100))',
        fill: 'hsl(var(--fill))',
        'blue-light': 'hsl(var(--blue-light))',
        'blue-base': 'hsl(var(--blue-base))',
        'blue-dark': 'hsl(var(--blue-dark))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      titles: ['"DM Sans"', 'sans-serif'],
    },
    fontSize: {
      'title-lg': [
        '1.75rem',
        {
          lineHeight: '120%',
          fontWeight: '700',
        },
      ],
      'title-md': [
        '1.5rem',
        {
          lineHeight: '120%',
          fontWeight: '700',
        },
      ],
      'title-sm': [
        '1.125rem',
        {
          lineHeight: '120%',
          fontWeight: '700',
        },
      ],
      subtitle: [
        '1rem',
        {
          lineHeight: '120%',
          fontWeight: '600',
        },
      ],
      'body-md': [
        '1rem',
        {
          lineHeight: '120%',
          fontWeight: '400',
        },
      ],
      'body-sm': [
        '0.875rem',
        {
          lineHeight: '120%',
          fontWeight: '400',
        },
      ],
      'body-xs': [
        '0.75rem',
        {
          lineHeight: '120%',
          fontWeight: '400',
        },
      ],
      'action-md': [
        '1rem',
        {
          lineHeight: '120%',
          fontWeight: '500',
        },
      ],
      'action-sm': [
        '0.875rem',
        {
          lineHeight: '120%',
          fontWeight: '500',
        },
      ],
      'label-md': [
        '0.75rem',
        {
          lineHeight: '120%',
          fontWeight: '500',
        },
      ],
      'label-sm': [
        '0.625rem',
        {
          lineHeight: '120%',
          fontWeight: '500',
        },
      ],
    },
  },
  plugins: [require('tailwindcss-animate')],
}
