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
    preload: true,
    fallback: ['monospace'],
    adjustFontFallback: false,
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial'],
    adjustFontFallback: false,
})

export const metadata: Metadata = {
    title: {
        default: 'Zian Huang',
        template: '%s | Zian Huang'
    },
    description: 'Personal website of Zian Huang: explore his technical projects, blog post, and creative artworks.',
    keywords: ['Zian Huang', 'technical projects', 'blogs', 'art gallery'],
    authors: [{ name: 'Zian Huang' }],
    creator: 'Zian Huang',
    publisher: 'Zian Huang',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://zianhuang.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'Zian Huang',
        description: 'Personal website of Zian Huang: explore his technical projects, blog post, and creative artworks.',
        siteName: 'Zian Huang',
        images: [
            {
                url: '/about/zianhuang.png',
                width: 200,
                height: 200,
                alt: 'Zian Huang',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Zian Huang',
        description: 'Personal website of Zian Huang: explore his technical projects, blog post, and creative artworks.',
        images: ['/about/zianhuang.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Zian Huang",
        "jobTitle": "Computational Fluid Dynamics Researcher & Software Engineer",
        "description": "Computational fluid dynamics researcher and software engineer specializing in numerical methods, mathematics, and web development.",
        "url": "https://zianhuang.com",
        "sameAs": [
            "https://github.com/zianhuang"
        ],
        "knowsAbout": [
            "Computational Fluid Dynamics",
            "Software Engineering",
            "Mathematics",
            "Numerical Methods",
            "Next.js",
            "React",
            "TypeScript"
        ],
        "alumniOf": {
            "@type": "Organization",
            "name": "University"
        }
    };

    return (
        <html lang="en" className={`h-full ${jetbrains.variable} ${inter.variable}`} suppressHydrationWarning>
            <head>
                {/* Critical resource preloading for LCP optimization */}
                <link rel="preload" href="/favicon_mascot.png" as="image" type="image/png" fetchPriority="high" />
                <link rel="preload" href="/about/zianhuang.png" as="image" type="image/png" />
                
                {/* Font optimization - Next.js fonts handle preloading automatically */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                
                {/* DNS prefetch for performance */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                
                {/* Structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </head>
            {/* antialiased - Enables subpixel antialiasing for smoother font rendering
                h-full - Makes the body take up 100% height of its parent (html element)
                flex - Enables flexbox layout system
                flex-col - Arranges child elements in a vertical column (Navbar on top, main content in middle, Footer at bottom) */}
            <body className="antialiased h-full flex flex-col">
                {/* Skip navigation link for accessibility */}
                <a 
                    href="#main-content" 
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    Skip to main content
                </a>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    {/* adding flex-1 so that the footer bar is always at the bottom */}
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
