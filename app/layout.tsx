import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/Footer";
import Navbar from './components/layout/Navbar';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased h-full flex flex-col`}>
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
