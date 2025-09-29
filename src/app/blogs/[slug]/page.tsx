// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import { getContentPage } from '@/src/lib/content_page_generator';
import { notFound } from 'next/navigation';
import ContentPageClient from '@/src/components/ProjAndBlogClient';
import { Metadata } from 'next';

type PageProps = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    if (!post) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const baseUrl = 'https://zianhuang.com';
    const pageUrl = `${baseUrl}/blogs/${post.slug}`;

    return {
        title: post.title,
        description: `Read "${post.title}" - A blog post by Zian Huang covering mathematics, computing and software engineering insights.`,
        keywords: ['Zian Huang', 'blogs', post.title],
        authors: [{ name: 'Zian Huang' }],
        creator: 'Zian Huang',
        publisher: 'Zian Huang',
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            type: 'article',
            locale: 'en_US',
            url: pageUrl,
            title: post.title,
            description: `Read "${post.title}" - A blog post by Zian Huang covering mathematics, computing and software engineering insights.`,
            siteName: 'Zian Huang',
            publishedTime: post.date,
            authors: ['Zian Huang'],
            images: [
                {
                    url: '/about/zianhuang.png',
                    width: 200,
                    height: 200,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: `Read "${post.title}" - A technical blog post by Zian Huang.`,
            images: ['/about/zianhuang.png'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function BlogPost({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    if (!post) {
        notFound();
    }

    return <ContentPageClient post={post} contentType="blog" />;
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
