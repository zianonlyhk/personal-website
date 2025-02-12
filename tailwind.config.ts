import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
                        'span.katex': {
                            display: 'inline-block',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
} satisfies Config;
