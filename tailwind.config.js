/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#073b68', // HR Cargo Navy Blue
          foreground: 'var(--primary-foreground)',
          light: '#0b508c',
          dark: '#0f1221',
        },
        secondary: {
          DEFAULT: '#0b508c',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: '#a4c639', // HR Cargo Lime Green
          foreground: 'var(--accent-foreground)',
          highlight: '#f47116', // Branding Orange discovered in CSS
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        brand: {
          cream: '#ffe9d9',
          deepDark: '#0c0211',
          slateBlue: '#252a3e',
        }
      },
    },
  },
  plugins: [],
}
