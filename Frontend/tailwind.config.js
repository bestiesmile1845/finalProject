/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Make sure this line includes your file paths
  ],
  theme: {
    extend: {
      colors: {
          blue1:'#3A6AAD',
          pink1:'#D77270', 
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      container: {
        center: true,
        padding: {
            DEFAULT: "1rem",
            sm: "2rem",
        },
    },
  },
  plugins: [],
}
}
