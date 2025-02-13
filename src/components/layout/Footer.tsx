import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        // border-t gives a line at the top of the footer
        <footer className="w-full py-4 px-6 border-t border-border bg-background">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side - Copyright text */}
                <div className="text-sm text-foreground">
                    &copy; 2025 Zian Huang
                </div>

                {/* Right side - Social Media Icons */}
                <div className="flex gap-6">
                    {/* GitHub */}
                    <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:opacity-80 transition-colors"
                    >
                        <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                    </Link>

                    {/* LinkedIn */}
                    <Link
                        href="https://linkedin.com/in/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:opacity-80 transition-colors"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                    </Link>

                    {/* Twitter/X */}
                    <Link
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:opacity-80 transition-colors"
                    >
                        <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer 