// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: string;
    enableSystem?: boolean;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: 'dark',
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'theme',
    attribute = 'class',
    enableSystem,
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem(storageKey) as Theme | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

        setTheme(storedTheme ||
            (defaultTheme === 'system' || enableSystem ? systemTheme : defaultTheme));
    }, [defaultTheme, enableSystem, storageKey]);

    useEffect(() => {
        const root = window.document.documentElement;

        if (attribute === 'class') {
            // Remove previous theme classes
            root.classList.remove('light', 'dark');

            // Add current theme class
            if (theme === 'system' && enableSystem !== false) {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                root.classList.add(systemTheme);
            } else if (theme !== 'system') {
                root.classList.add(theme);
            }
        } else {
            // For non-class attributes
            root.removeAttribute(attribute);
            if (theme === 'system' && enableSystem !== false) {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                root.setAttribute(attribute, systemTheme);
            } else if (theme !== 'system') {
                root.setAttribute(attribute, theme);
            }
        }
    }, [theme, attribute, enableSystem]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    // Prevent rendering theme-dependent components on server
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
