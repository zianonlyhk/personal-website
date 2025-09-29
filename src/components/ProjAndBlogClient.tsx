// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import ReturnButton from '@/src/components/ReturnButton';
import BlogHeader from '@/src/components/blog/BlogHeader';
import BlogContent from '@/src/components/blog/BlogContent';
import ImageModal from '@/src/components/blog/ImageModal';
import { useImageModal } from '@/src/hooks/useImageModal';
import Breadcrumbs from '@/src/components/Breadcrumbs';

interface ContentPage {
    slug: string;
    title: string;
    // since there is no date information on my project pages
    date?: string;
    content: string;
    githubUrl?: string;
}

interface ContentPageClientProps {
    post: ContentPage | null;
    contentType?: 'blog' | 'project';
}

export default function ContentPageClient({ post, contentType = 'blog' }: ContentPageClientProps) {
    const { selectedImage, isSmallScreen, closeModal } = useImageModal();

    if (!post) {
        return (
            <div className="content_container">
                <p>Content not found</p>
            </div>
        );
    }

    // Structured data for SEO
    const structuredData = contentType === 'blog' ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": "Zian Huang"
        },
        "publisher": {
            "@type": "Person",
            "name": "Zian Huang"
        }
    } : {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "headline": post.title,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": "Zian Huang"
        }
    };

    return (
        <div className="content_container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Breadcrumbs />
            <ReturnButton />
            <BlogHeader 
                title={post.title}
                date={post.date}
                githubUrl={post.githubUrl}
            />
            <BlogContent content={post.content} />

            {selectedImage && (
                <ImageModal 
                    image={selectedImage}
                    isSmallScreen={isSmallScreen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
