/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 5px 0px #00000040',
      },
      colors: {
        'charcoal': '#334155',
        'cultured-gray': '#F0F2F5',
        'cultured-dark-gray': '#667185',
        'cultured-gray-2': '#647995',
        'dark-gray': '#667185',
        'blue': '#0D6EFD',
        'light-blue': '#F0F6FE',
        'cultured-gray-3' : '#98A2B3', 
        'light-gray': '#94A3B8',
        'light-gray-2': '#CBD5E1',
        'yankee-blue': '#1D2739',
        'independence': '#475569',
        'light-green': '#E7F6EC',
        'green': '#0F973D',
        'light-blue': '#F0F6FE',
        'light-orange': '#FEF4E6',
        'orange': '#F58A07',
        'independence-2': '#475367' 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
