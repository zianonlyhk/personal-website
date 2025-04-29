// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useTheme } from '@/src/components/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-md hover:bg-card hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? (
                <FontAwesomeIcon icon={faSun} className="h-4 w-4 text-primary" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="h-4 w-4 text-primary" />
            )}
        </button>
    );
} 

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
