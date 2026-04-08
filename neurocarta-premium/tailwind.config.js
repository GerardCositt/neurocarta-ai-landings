/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nc: {
          bg:       '#080808',
          surface:  '#111111',
          elevated: '#1A1A1A',
          border:   '#252525',
          gold:     '#D4A84B',
          'gold-dim': '#9B7833',
          red:      '#C83030',
          'red-hover': '#A02424',
          orange:   '#E07030',
          text:     '#F0F0F0',
          muted:    '#888888',
          subtle:   '#444444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A84B 0%, #F0C97A 50%, #D4A84B 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
