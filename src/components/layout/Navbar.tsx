// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/src/components/ThemeToggle';

const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navHeight = useRef<number>(0);
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // hides the return button in small screen
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        // Add event listeners when component mounts
        // Store the navbar height for positioning the dropdown
        if (navRef.current) {
            navHeight.current = navRef.current.offsetHeight;
        }
        window.addEventListener('scroll', handleScroll);

        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // clicking the content closes the menu bar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Don't close if clicking inside the navbar or on the hamburger button
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                // Don't close if clicking on the logo/title
                if (logoRef.current && !logoRef.current.contains(event.target as Node)) {
                    setIsMenuOpen(false);
                }
            }
        };

        // Only add the event listener if the menu is open
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Add handler for navigation clicks if needed in the future
    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle keyboard events for mobile menu
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    // Focus management for mobile menu
    useEffect(() => {
        if (isMenuOpen && mobileMenuRef.current) {
            // Focus the first link when menu opens
            const firstLink = mobileMenuRef.current.querySelector('a');
            if (firstLink) {
                (firstLink as HTMLAnchorElement).focus();
            }
        }
    }, [isMenuOpen]);

    return (
        <nav className={`${scrolled ? 'shadow-sm' : ''} z-50`} ref={navRef}>
            <div className="nav-container">
                {/* Left side - the button "zian" and theme toggle */}
                <div className="flex items-center gap-2">
                    <div>
                        <Link
                            href="/"
                            className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
                            onClick={handleNavClick}
                            ref={logoRef}
                        >
                            zian
                        </Link>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Navigation links - visible only on desktop */}
                <div className="nav-link-desktop-container">
                    <div>
                        <Link
                            href="/projects"
                            className={`nav-link ${pathname?.startsWith('/projects') ? 'nav-link-active' : ''}`}
                            onClick={handleNavClick}
                        >
                            projects
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/blogs"
                            className={`nav-link ${pathname?.startsWith('/blogs') ? 'nav-link-active' : ''}`}
                            onClick={handleNavClick}
                        >
                            blogs
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/gallery"
                            className={`nav-link ${pathname?.startsWith('/gallery') ? 'nav-link-active' : ''}`}
                            onClick={handleNavClick}
                        >
                            gallery
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/about"
                            className={`nav-link ${pathname?.startsWith('/about') ? 'nav-link-active' : ''}`}
                            onClick={handleNavClick}
                        >
                            about
                        </Link>
                    </div>
                </div>


                {/* Hamburger menu for mobile */}
                <button
                    className="hamburger-menu"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Mobile dropdown menu */}
                <div 
                    className={`mobile-dropdown ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                    ref={mobileMenuRef}
                    onKeyDown={handleKeyDown}
                    role="menu"
                    aria-label="Main navigation menu"
                >
                    <div className="mobile-dropdown-nav-link-container">
                        <div>
                            <Link
                                href="/projects"
                                className={`nav-link ${pathname?.startsWith('/projects') ? 'nav-link-active' : ''}`}
                                onClick={handleNavClick}
                                role="menuitem"
                            >
                                projects
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/blogs"
                                className={`nav-link ${pathname?.startsWith('/blogs') ? 'nav-link-active' : ''}`}
                                onClick={handleNavClick}
                                role="menuitem"
                            >
                                blogs
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/gallery"
                                className={`nav-link ${pathname?.startsWith('/gallery') ? 'nav-link-active' : ''}`}
                                onClick={handleNavClick}
                                role="menuitem"
                            >
                                gallery
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/about"
                                className={`nav-link ${pathname?.startsWith('/about') ? 'nav-link-active' : ''}`}
                                onClick={handleNavClick}
                                role="menuitem"
                            >
                                about
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
