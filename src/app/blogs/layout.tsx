import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'Explore the blog posts written by Zian Huang covering mathematics, computing and software engineering insights.',
    keywords: ['Zian Huang', 'blogs'],
    alternates: {
        canonical: '/blogs',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/blogs',
        title: 'Blogs | Zian Huang',
        description: 'Explore the blog posts written by Zian Huang covering mathematics, computing and software engineering insights.',
        siteName: 'Zian Huang',
        images: [
            {
                url: '/favicon_mascot.png',
                width: 200,
                height: 200,
                alt: 'Zian Huang - Blogs',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blogs | Zian Huang',
        description: 'Explore the blog posts written by Zian Huang covering mathematics, computing and software engineering insights.',
        images: ['/favicon_mascot.png'],
    },
};

export default function BlogsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}