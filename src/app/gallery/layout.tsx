import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Explore the art gallery of Zian Huang featuring visual art studies and creative explorations.',
    keywords: ['Zian Huang', 'art', 'gallery', 'visual art', 'digital art'],
    alternates: {
        canonical: '/gallery',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/gallery',
        title: 'Gallery | Zian Huang',
        description: 'Explore the art gallery of Zian Huang featuring visual art studies and creative explorations.',
        siteName: 'Zian Huang',
        images: [
            {
                url: '/about/zianhuang.png',
                width: 200,
                height: 200,
                alt: 'Zian Huang - Gallery',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gallery | Zian Huang',
        description: 'Explore the art gallery of Zian Huang featuring visual art studies and creative explorations.',
        images: ['/about/zianhuang.png'],
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}