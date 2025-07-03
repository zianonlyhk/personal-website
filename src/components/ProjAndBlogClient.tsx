// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import ReturnButton from '@/src/components/ReturnButton';
import BlogHeader from '@/src/components/blog/BlogHeader';
import BlogContent from '@/src/components/blog/BlogContent';
import ImageModal from '@/src/components/blog/ImageModal';
import { useImageModal } from '@/src/hooks/useImageModal';

interface BlogPost {
    slug: string;
    title: string;
    // since there is no date information on my project pages
    date?: string;
    content: string;
    githubUrl?: string;
}

interface BlogPostClientProps {
    post: BlogPost | null;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const { selectedImage, isSmallScreen, closeModal } = useImageModal();

    if (!post) {
        return (
            <div className="content_container">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="content_container">
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
