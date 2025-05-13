// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import Link from 'next/link'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                {/* Left side - Copyright text */}
                <div className="flex items-center">
                    <Link
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/ccby_license.png"
                            alt="CC BY License"
                            width={80}
                            height={80}
                            className="footer-cclicense-img"
                        />
                    </Link>
                    <span className="mr-1">&copy;</span>
                    <span> Zian Huang</span>
                </div>

                {/* Right side - Social Media Icons */}
                <div className="footer-social-container">
                    {/* GitHub */}
                    <Link
                        href="https://github.com/zianonlyhk"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} className="footer-social-icon" />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://linkedin.com/in/zian-huang/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="footer-social-icon" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
