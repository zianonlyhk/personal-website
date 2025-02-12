import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-t border-gray-200 dark:border-gray-700 py-4 px-6 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto flex justify-between items-center font-roboto-mono">
                <div className="flex items-center">
                    <Link href="/" className="hover:opacity-80 font-medium flex items-center gap-2">
                        zianhuang
                    </Link>
                </div>

                <div className="flex gap-6">
                    <Link href="/projects" className="hover:opacity-80 font-medium flex items-center gap-2">
                        projects
                    </Link>
                    <Link href="/blog" className="hover:opacity-80 font-medium flex items-center gap-2">
                        blog
                    </Link>
                    <Link href="/gallery" className="hover:opacity-80 font-medium flex items-center gap-2">
                        gallery
                    </Link>
                    <Link href="/about" className="hover:opacity-80 font-medium flex items-center gap-2">
                        about_me
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 