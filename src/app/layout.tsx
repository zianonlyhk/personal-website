/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   layout.tsx                                                               */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:47:02 by Zian Huang                               */
/*   Updated: 2025/02/17 21:47:02 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

import "@/src/app/globals.css"
import 'katex/dist/katex.min.css'
import Footer from "@/src/components/layout/Footer"
import Navbar from '@/src/components/layout/Navbar'

// Working on the website's font
import { Roboto, Roboto_Mono } from 'next/font/google'
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
})
const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className={`${roboto.variable} ${roboto_mono.variable} antialiased h-full flex flex-col`}>
                <Navbar />
                <main className="flex-1 sm:p-4 md:p-10">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
