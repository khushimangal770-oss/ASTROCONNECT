/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // All colors read from CSS variables (defined in index.css) so the
        // theme toggle (ThemeContext) can swap every color at once by
        // flipping a data-theme attribute on <html> — no per-component work.
        ink: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          surface: 'rgb(var(--c-surface) / <alpha-value>)',
          surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
          line: 'rgb(var(--c-line) / <alpha-value>)',
          text: 'rgb(var(--c-text) / <alpha-value>)',
          muted: 'rgb(var(--c-muted) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--c-violet) / <alpha-value>)',
          dark: 'rgb(var(--c-violet) / <alpha-value>)',
        },
        pink: { DEFAULT: 'rgb(var(--c-pink) / <alpha-value>)' },
        cyan: { DEFAULT: 'rgb(var(--c-cyan) / <alpha-value>)' },
        gold: { DEFAULT: 'rgb(var(--c-gold) / <alpha-value>)' },
        busy: 'rgb(var(--c-busy) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-violet) / 0.25), 0 8px 30px -6px rgb(var(--c-violet) / 0.35)',
        panel: '0 24px 70px rgb(0 0 0 / 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgb(var(--c-violet)), rgb(var(--c-pink)))',
        'brand-gradient-3': 'linear-gradient(135deg, rgb(var(--c-violet)) 10%, rgb(var(--c-pink)) 55%, rgb(var(--c-gold)) 100%)',
      },
    },
  },
  plugins: [],
}
