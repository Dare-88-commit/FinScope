/** @type {import('tailwindcss').Config} */
module.exports = {
  // This array is CRITICAL: it tells Tailwind to scan all files 
  // in the 'pages', 'components', and 'app' directories for classes.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // You can customize colors, fonts, and spacing here.
    extend: {
      // Example: Adding a custom background image
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
      }
    },
  },
  plugins: [],
}
