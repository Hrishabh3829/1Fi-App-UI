import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fi-purple': {
          DEFAULT: '#6D28D9', // Deep violet accent
          dark: '#4C1D95',    // Banner deep indigo/violet
          light: '#F5F3FF',   // Subtle lavender background
          border: '#DDD6FE',  // Light purple border
        },
        'fi-bg': '#F5F5F7',   // Page surface grey
        'fi-card': '#FFFFFF', // Card background
        'fi-subtext': '#6B7280', // Secondary subtitle text
        'fi-border': '#E5E7EB', // Card / divider border
        'fi-badge': '#F3F4F6',  // Metric badge background
      },
      borderRadius: {
        'xl': '0.875rem',     // 14px
        '2xl': '1.25rem',     // 20px - Card standard
        '3xl': '1.75rem',     // 28px
        'full': '9999px',     // Pills and badges
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'nav': '0 -4px 16px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
