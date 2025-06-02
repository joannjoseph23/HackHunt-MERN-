import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFEDD5', // Pale Orange
        accent: '#BFDBFE',  // Light Blue
        textPrimary: '#1F2937', // Dark Gray for text
      },
    },
  },
  plugins: [],
};
export default config;
