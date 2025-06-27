import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore the projects made by Zian Huang showcasing computational engineering and mathematical modeling.',
    keywords: ['Zian Huang', 'projects'],
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/projects',
        title: 'Projects | Zian Huang',
        description: 'Explore the projects made by Zian Huang showcasing computational engineering and mathematical modeling.',
        siteName: 'Zian Huang',
        images: [
            {
                url: '/favicon_mascot.png',
                width: 200,
                height: 200,
                alt: 'Zian Huang - Projects',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Zian Huang',
        description: 'Explore the projects made by Zian Huang showcasing computational engineering and mathematical modeling.',
        images: ['/favicon_mascot.png'],
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}