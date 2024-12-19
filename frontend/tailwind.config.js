// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        "primary-dark":'#5A54D4',
        secondary: '#FF6584',
        "secondaryDark":"#CC526A",
        accent1: '#4CAF50',
        accent2: '#FFC107',
        misleading: '#FF9800',
        upgrade: '#FFD700',
        text: '#333333',
        bg: '#F0F2F5',
        cardBg: '#FFFFFF',
        sidebarBg: '#2C3E50',
        sidebarText: '#ECF0F1',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}
