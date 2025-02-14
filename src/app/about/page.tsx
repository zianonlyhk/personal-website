import Image from 'next/image';

export default function About() {
    return (
        <div className="content_container">
            <h1 className="title-boss">About Me</h1>

            <div className="content_content">
                <p>
                    Hello! I&apos;m a passionate developer interested in building amazing web experiences.
                </p>

                {/* put the image to the center of the page */}
                <div className="image-container flex justify-center">
                    <Image
                        src="/cat3.jpeg"
                        alt="About me image"
                        width={400}
                        height={800}
                        priority
                        className="image"
                    />
                </div>

                <h2>Skills</h2>
                <ul>
                    <li>Frontend Development (React, Next.js)</li>
                    <li>Backend Development (Node.js)</li>
                    <li>Database Management</li>
                    <li>Cloud Services</li>
                </ul>
                <h2>Experience</h2>
                <p>
                    Details about your professional experience...
                </p>
                <h2>Education</h2>
                <p>
                    Your educational background...
                </p>
            </div>
        </div>
    );
} 