import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        lemon: {
          primary: '#00F068',
          accent:  '#806CF2',
          black:  '#000000',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
