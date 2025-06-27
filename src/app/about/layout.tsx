import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn about Zian Huang, a computational researcher and software engineer specializing in numerical methods, mathematics, and technical computing.',
    keywords: ['Zian Huang', 'about me'],
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        type: 'profile',
        locale: 'en_US',
        url: '/about',
        title: 'About | Zian Huang',
        description: 'Learn about Zian Huang, a computational researcher and software engineer specializing in numerical methods, mathematics, and technical computing.',
        siteName: 'Zian Huang',
        images: [
            {
                url: '/about/selfie.png',
                width: 400,
                height: 400,
                alt: 'Zian Huang - About',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About | Zian Huang',
        description: 'Learn about Zian Huang, a computational researcher and software engineer specializing in numerical methods, mathematics, and technical computing.',
        images: ['/about/selfie.png'],
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}