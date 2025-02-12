import "@/src/app/globals.css"
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
                <main className="flex-1 p-20">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
