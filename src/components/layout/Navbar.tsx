'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const baseClasses = "hover:opacity-80 font-medium flex items-center gap-2 px-2 py-1 rounded";
    const activeClasses = "bg-foreground text-background";

    return (
        <nav className="fixed top-0 w-full z-50 py-4 px-6 border-t border-border bg-background">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex">
                    <Link
                        href="/"
                        className={`${baseClasses} ${pathname === '/' ? activeClasses : ''}`}
                    >
                        zianhuang
                    </Link>
                </div>

                <div className="flex gap-1">
                    <Link
                        href="/projects"
                        className={`${baseClasses} ${pathname?.startsWith('/projects') ? activeClasses : ''}`}
                    >
                        projects
                    </Link>
                    <Link
                        href="/blog"
                        className={`${baseClasses} ${pathname?.startsWith('/blog') ? activeClasses : ''}`}
                    >
                        blog
                    </Link>
                    <Link
                        href="/gallery"
                        className={`${baseClasses} ${pathname?.startsWith('/gallery') ? activeClasses : ''}`}
                    >
                        gallery
                    </Link>
                    <Link
                        href="/about"
                        className={`${baseClasses} ${pathname?.startsWith('/about') ? activeClasses : ''}`}
                    >
                        about_me
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 