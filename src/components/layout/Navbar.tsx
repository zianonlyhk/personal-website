'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav>
            <div className="nav-container">
                {/* Left hand side of the navbar: home button */}
                <div>
                    <Link
                        href="/"
                        className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
                    >
                        zianhuang
                    </Link>
                </div>

                {/* Right hand side of the navbar: Projects, Blog, Gallery, AboutMe */}
                <div className="flex gap-1">
                    <Link
                        href="/projects"
                        className={`nav-link ${pathname?.startsWith('/projects') ? 'nav-link-active' : ''}`}
                    >
                        projects
                    </Link>
                    <Link
                        href="/blog"
                        className={`nav-link ${pathname?.startsWith('/blog') ? 'nav-link-active' : ''}`}
                    >
                        blog
                    </Link>
                    <Link
                        href="/gallery"
                        className={`nav-link ${pathname?.startsWith('/gallery') ? 'nav-link-active' : ''}`}
                    >
                        gallery
                    </Link>
                    <Link
                        href="/about"
                        className={`nav-link ${pathname?.startsWith('/about') ? 'nav-link-active' : ''}`}
                    >
                        about_me
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 