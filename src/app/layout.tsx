// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import "@/src/app/globals.css"
import 'katex/dist/katex.min.css'
import Footer from "@/src/components/layout/Footer"
import Navbar from '@/src/components/layout/Navbar'
import { Metadata } from 'next'
import { ThemeProvider } from '@/src/components/ThemeProvider'

// Working on the website's font
import { JetBrains_Mono, Inter } from 'next/font/google'

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Zian H.',
    description: 'Personal website of Zian Huang, with some of his selected projects, blogs, and artworks.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full ${jetbrains.variable} ${inter.variable}`} suppressHydrationWarning>
            <body className="antialiased h-full flex flex-col bg-background text-foreground font-sans">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
