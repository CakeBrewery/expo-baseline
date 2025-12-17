/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./index.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        backgroundLight: '#f9fbff',
        backgroundDark: '#050505',
        surface: '#ffffff',
        border: '#e2e8f0',
        panelBorder: '#cbd5f5',
        panelTint: '#f1f5f9',
        timelinePrimary: '#1e40af',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#64748b',
        kicker: '#778399',
        labelMuted: '#7c8599',
        placeholder: '#94a3b8',
      },
    },
  },
  plugins: [],
}

