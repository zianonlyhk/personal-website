export default function About() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                <div className="prose prose-invert">
                    <p>
                        Hello! I&apos;m a passionate developer interested in building amazing web experiences.
                    </p>
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
        </div>
    );
} 