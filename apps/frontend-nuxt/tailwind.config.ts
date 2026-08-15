import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#111827',
        foreground: '#e5e7eb',
        primary: {
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
          light: '#a78bfa'
        },
        muted: {
          DEFAULT: '#1f2937',
          foreground: '#9ca3af'
        },
        accent: '#f59e0b',
        card: {
          DEFAULT: '#1f2937',
          foreground: '#e5e7eb'
        },
        border: '#374151',
        ring: '#7c3aed',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      }
    }
  }
}
