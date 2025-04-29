// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import { getContentPage } from '@/src/lib/content_page_generator';
import BlogPostClient from '@/src/components/BlogPostClient';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    return <BlogPostClient post={post} />;
} 

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
