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
                card: "var(--card)",
                border: "var(--border)",
                // This controls the colour of the read more button in the blog page
                primary: {
                    50: '#f0f9ff', // light blue
                    500: '#0ea5e9', // blue
                    900: '#0c4a6e', // dark blue
                },
                accent: {
                    50: '#fdf4ff', // light purple
                    500: '#d946ef', // purple
                    900: '#701a75', // dark purple
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        // Sets the default text color to var(--foreground)
                        color: 'var(--foreground)',
                        'span.katex': {
                            // Sets the default text color of the math equations to var(--foreground)
                            color: 'var(--foreground)',
                            display: 'inline-block',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} satisfies Config;
