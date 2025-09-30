// Author: Zian Huang
// Date Created: 2025-09-30
// ----------------------------------------

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";
import { act } from "react";

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Test component that uses the theme
function TestComponent() {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <div data-testid="theme-display">{theme}</div>
            <button onClick={() => setTheme("dark")} data-testid="set-dark">
                Set Dark
            </button>
            <button onClick={() => setTheme("light")} data-testid="set-light">
                Set Light
            </button>
            <button onClick={() => setTheme("system")} data-testid="set-system">
                Set System
            </button>
        </div>
    );
}

describe("ThemeProvider", () => {
    beforeEach(() => {
        localStorageMock.clear();
        document.documentElement.className = "";
        document.documentElement.removeAttribute("data-theme");
    });

    it("should render children", async () => {
        render(
            <ThemeProvider>
                <div data-testid="child">Test Child</div>
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("child")).toBeInTheDocument();
        });
    });

    it("should initialize with default theme", async () => {
        render(
            <ThemeProvider defaultTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("theme-display")).toHaveTextContent("dark");
        });
    });

    it("should initialize with system theme when default is system", async () => {
        render(
            <ThemeProvider defaultTheme="system" enableSystem>
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            // Should resolve to 'dark' since matchMedia is mocked to match dark theme
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });
    });

    it("should load theme from localStorage if available", async () => {
        localStorageMock.setItem("theme", "light");

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("theme-display")).toHaveTextContent("light");
        });
    });

    it("should update theme when setTheme is called", async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("set-dark")).toBeInTheDocument();
        });

        await act(async () => {
            screen.getByTestId("set-dark").click();
        });

        await waitFor(() => {
            expect(screen.getByTestId("theme-display")).toHaveTextContent("dark");
            expect(localStorageMock.getItem("theme")).toBe("dark");
        });
    });

    it("should apply theme class to document element", async () => {
        render(
            <ThemeProvider defaultTheme="light" attribute="class">
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(document.documentElement.classList.contains("light")).toBe(true);
        });

        await act(async () => {
            screen.getByTestId("set-dark").click();
        });

        await waitFor(() => {
            expect(document.documentElement.classList.contains("dark")).toBe(true);
            expect(document.documentElement.classList.contains("light")).toBe(false);
        });
    });

    it("should use custom storage key", async () => {
        render(
            <ThemeProvider storageKey="custom-theme" defaultTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("set-light")).toBeInTheDocument();
        });

        await act(async () => {
            screen.getByTestId("set-light").click();
        });

        await waitFor(() => {
            expect(localStorageMock.getItem("custom-theme")).toBe("light");
        });
    });

    it("should throw error when useTheme is used outside ThemeProvider", () => {
        // Suppress console.error for this test
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        expect(() => {
            render(<TestComponent />);
        }).toThrow("useTheme must be used within a ThemeProvider");

        consoleSpy.mockRestore();
    });
});

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
