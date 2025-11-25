import type { Config } from 'tailwindcss';

const config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,html}',
  ],

  // <- AQUÍ integrás lo del primer archivo
  safelist: [
    'shadow-[0_0_10px_rgba(0,240,104,0.25)]',
    'shadow-[0_0_12px_rgba(0,240,104,0.55)]',
    'shadow-[0_0_25px_rgba(0,240,104,0.35)]',
    'drop-shadow-[0_0_10px_#00f068]',
  ],

  theme: {
    extend: {
      colors: {
        lemon: {
          primary: '#00F068',
          accent:  '#806CF2',
          black:   '#000000',
        },
      },
      // si mañana querés extender boxShadow, tipografías, etc., lo agregás acá
    },
  },

  plugins: [],
} satisfies Config;

export default config;
