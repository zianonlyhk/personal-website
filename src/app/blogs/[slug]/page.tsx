// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import { getContentPage } from '@/src/lib/content_page_generator';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/src/components/ProjAndBlogClient';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
