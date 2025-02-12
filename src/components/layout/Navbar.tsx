import React from 'react';
import { FaHome, FaCode, FaPenNib, FaImages, FaUser } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="w-full border-t border-gray-700 py-4 px-6 bg-gray-900 text-gray-400">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side - Home icon */}
                <div className="flex items-center">
                    <Link href="/" className="text-2xl text-gray-400 hover:text-gray-200">
                        <FaHome />
                    </Link>
                </div>

                {/* Right side - Navigation buttons */}
                <div className="flex gap-6">
                    <Link href="/projects" className="hover:text-gray-200 font-medium flex items-center gap-2">
                        <FaCode />
                        Projects
                    </Link>
                    <Link href="/blog" className="hover:text-gray-200 font-medium flex items-center gap-2">
                        <FaPenNib />
                        Blog
                    </Link>
                    <Link href="/gallery" className="hover:text-gray-200 font-medium flex items-center gap-2">
                        <FaImages />
                        Gallery
                    </Link>
                    <Link href="/about" className="hover:text-gray-200 font-medium flex items-center gap-2">
                        <FaUser />
                        About Me
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 