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
    const project = await getContentPage(resolvedParams.slug, 'projects');

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }

    const baseUrl = 'https://zianhuang.com';
    const pageUrl = `${baseUrl}/projects/${project.slug}`;

    return {
        title: project.title,
        description: `Explore "${project.title}" - A project by Zian Huang showcasing computational engineering and mathematical modeling.`,
        keywords: ['Zian Huang', 'projects', project.title],
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
            title: project.title,
            description: `Explore "${project.title}" - A project by Zian Huang showcasing computational engineering and mathematical modeling.`,
            siteName: 'Zian Huang',
            publishedTime: project.date,
            authors: ['Zian Huang'],
            images: [
                {
                    url: '/about/zianhuang.png',
                    width: 200,
                    height: 200,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: `Explore "${project.title}" - A project by Zian Huang.`,
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

export default async function ProjectPage({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'projects');

    if (!post) {
        notFound();
    }

    return <ContentPageClient post={post} contentType="project" />;
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
