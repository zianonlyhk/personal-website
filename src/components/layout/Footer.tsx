// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer-container">
                {/* Left side - Copyright text */}
                <div className="flex items-center">
                    <span className="text-primary mr-1">&copy;</span>
                    <span>{currentYear} Zian Huang</span>
                </div>

                {/* Right side - Social Media Icons */}
                <div className="footer-social-links">
                    {/* GitHub */}
                    <Link
                        href="https://github.com/zianonlyhk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} className="footer-icon" />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://linkedin.com/in/zian-huang/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
