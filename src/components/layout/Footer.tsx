/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   Footer.tsx                                                               */
/*                                                                            */
/*   By: Zian Huang <zianhuang00@gmail.com>                                   */
/*                                                                            */
/*   Created: 2025/02/17 21:46:06 by Zian Huang                               */
/*   Updated: 2025/02/17 21:46:06 by Zian Huang                               */
/*                                                                            */
/* ************************************************************************** */

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                {/* Left side - Copyright text */}
                <div>
                    &copy; 2025 Zian Huang
                </div>

                {/* Right side - Social Media Icons */}
                <div className="footer-social-links">
                    {/* GitHub */}
                    <Link
                        href="https://github.com/zianonlyhk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                    >
                        <FontAwesomeIcon icon={faGithub} className="footer-icon" />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://linkedin.com/in/zian-huang/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer 