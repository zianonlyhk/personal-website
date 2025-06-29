import { getContentList } from '@/src/lib/content_page_generator';

export default async function sitemap() {
    const baseUrl = 'https://zianhuang.com';

    // Get all blog posts and projects (using a large page size to get all)
    const blogs = await getContentList('blogs', 1, 100);
    const projects = await getContentList('projects', 1, 100);

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ];

    // Dynamic blog pages
    const blogPages = blogs.map((blog: any) => {
        // Create a valid date, fallback to current date if invalid
        let lastModified = new Date();
        if (blog.date) {
            const blogDate = new Date(blog.date);
            if (!isNaN(blogDate.getTime())) {
                lastModified = blogDate;
            }
        }

        return {
            url: `${baseUrl}/blogs/${blog.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
    });

    // Dynamic project pages
    const projectPages = projects.map((project: any) => {
        // Create a valid date, fallback to current date if invalid
        let lastModified = new Date();
        if (project.date) {
            const projectDate = new Date(project.date);
            if (!isNaN(projectDate.getTime())) {
                lastModified = projectDate;
            }
        }

        return {
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
    });

    return [...staticPages, ...blogPages, ...projectPages];
}