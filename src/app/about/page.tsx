import Image from 'next/image';

export default function About() {
    return (
        <div className="content_container items-center">
            <h1 className="title-boss">About Me</h1>

            <div className="content_content">

                <p className="body-large">
                    Hello! I&apos;m a passionate developer interested in building amazing web experiences.
                </p>

                {/* put the image to the center of the page */}
                <div className="image-container flex justify-center">
                    <Image
                        src="/about/test.png"
                        alt="About me image"
                        width={400}
                        height={800}
                        priority
                        className="image"
                    />
                </div>

                <h2 className="title-medium">Skills</h2>
                <ul className="unordered-list">
                    <li>Frontend Development (React, Next.js)</li>
                    <li>Backend Development (Node.js)</li>
                    <li>Database Management</li>
                    <li>Cloud Services</li>
                </ul>
                <h2 className="title-medium">Experience</h2>
                <p className="body-large">
                    Details about your professional experience...
                </p>
                <h2 className="title-medium">Education</h2>
                <p className="body-large">
                    Your educational background...
                </p>
            </div>
        </div>
    );
} 