import type { Config } from "tailwindcss";

export default {
<<<<<<< HEAD
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          500: '#d946ef',
          900: '#701a75',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--foreground)',
            a: {
              color: 'var(--foreground)',
              '&:hover': {
                color: '#0ea5e9',
              },
            },
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
=======
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                popover: "var(--popover)",
                "popover-foreground": "var(--popover-foreground)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)",
                accent: "var(--accent)",
                "accent-foreground": "var(--accent-foreground)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                border: "var(--border)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: 'var(--foreground)',
                        a: {
                            color: 'var(--primary)',
                            '&:hover': {
                                color: 'var(--primary)',
                            },
                        },
                        h1: {
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-mono)',
                        },
                        h2: {
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-mono)',
                        },
                        h3: {
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-mono)',
                        },
                        'span.katex': {
                            color: 'var(--foreground)',
                            display: 'inline-block',
                        },
                        code: {
                            color: 'var(--accent)',
                            backgroundColor: 'var(--muted)',
                            borderRadius: '0.25rem',
                            padding: '0.125rem 0.25rem',
                            fontFamily: 'var(--font-mono)',
                        },
                        pre: {
                            backgroundColor: 'var(--card)',
                            borderRadius: '0.375rem',
                            border: '1px solid var(--border)',
                        },
                    },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
>>>>>>> dev
} satisfies Config;
