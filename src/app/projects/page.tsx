import ProjectPreview from '@/src/components/ProjectPreview';

export default function Projects() {
    const projects = [
        {
            slug: 'personal-portfolio',
            title: 'Personal Portfolio Website',
            excerpt: 'A Next.js-powered portfolio website showcasing my projects and skills. Built with TypeScript and Tailwind CSS.',
            date: '2024-03-20',
            githubUrl: 'https://github.com/yourusername/personal-portfolio',
            thumbnailUrl: '/images/portfolio-thumbnail.jpg',
        },
        {
            slug: 'task-management-app',
            title: 'Task Management Application',
            excerpt: 'A full-stack task management application built with React, Node.js, and MongoDB. Features include user authentication and real-time updates.',
            date: '2024-02-15',
        },
        {
            slug: 'weather-dashboard',
            title: 'Weather Dashboard',
            excerpt: 'A weather dashboard that displays current weather conditions and forecasts using OpenWeather API. Built with React and Chart.js.',
            date: '2024-01-10',
        },
    ];

    return (
        <div className="blog_post_container">
            <h1 className="title-boss">My Projects</h1>
            <div className="blog_post_preview_container">
                {projects.map((project) => (
                    <ProjectPreview
                        key={project.slug}
                        title={project.title}
                        preview={project.excerpt}
                        date={project.date}
                        href={`/projects/${project.slug}`}
                        githubUrl={project.githubUrl}
                        thumbnailUrl={project.thumbnailUrl}
                    />
                ))}
            </div>
        </div>
    );
} 