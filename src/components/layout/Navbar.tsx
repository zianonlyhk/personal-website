'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Check if the click is outside the navigation menu
            const nav = document.querySelector('nav');
            if (nav && !nav.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        // Add event listener when component mounts
        document.addEventListener('click', handleClick);

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Add handler to close menu on navigation
    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav>
            <div className="nav-container flex-col md:flex-row">
                {/* Mobile menu button */}
                <div className="flex justify-between items-center w-full md:w-auto">
                    <Link
                        href="/"
                        className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
                        onClick={handleNavClick}
                    >
                        __init__
                    </Link>
                    <button className="md:hidden" onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        setIsMenuOpen(!isMenuOpen);
                    }}>
                        ☰
                    </button>
                </div>

                {/* Navigation links */}
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 gap-1`}>
                    <Link
                        href="/projects"
                        className={`nav-link ${pathname?.startsWith('/projects') ? 'nav-link-active' : ''}`}
                        onClick={handleNavClick}
                    >
                        projects
                    </Link>
                    <Link
                        href="/blogs"
                        className={`nav-link ${pathname?.startsWith('/blogs') ? 'nav-link-active' : ''}`}
                        onClick={handleNavClick}
                    >
                        blogs
                    </Link>
                    <Link
                        href="/gallery"
                        className={`nav-link ${pathname?.startsWith('/gallery') ? 'nav-link-active' : ''}`}
                        onClick={handleNavClick}
                    >
                        gallery
                    </Link>
                    <Link
                        href="/about"
                        className={`nav-link ${pathname?.startsWith('/about') ? 'nav-link-active' : ''}`}
                        onClick={handleNavClick}
                    >
                        about_zian
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 