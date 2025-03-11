/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   layout.tsx                                                               */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:47:02 by Zian Huang                               */
/*   Updated: 2025/03/11 01:46:24 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

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
    title: 'Zian Huang | Technology & Mathematics',
    description: 'Personal website of Zian Huang, exploring the intersection of technology and mathematics.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full ${jetbrains.variable} ${inter.variable}`} suppressHydrationWarning>
            <body className="antialiased h-full flex flex-col bg-background text-foreground font-sans">
                <ThemeProvider defaultTheme="dark">
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
