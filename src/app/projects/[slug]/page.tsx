// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

import { getContentPage } from '@/src/lib/content_page_generator';
import { notFound } from 'next/navigation';
import ReturnButton from '@/src/components/ReturnButton';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
    // Got this error:
    // Error: Route "/projects/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'project');

    if (!post) {
        notFound();
    }

    // We do not need any date information for project items
    return (
        <div className="content_container">
            <ReturnButton />
            <h1 className="title-boss mb-2 md:mb-4 font-mono">{post.title}</h1>
            <div
                className="content_content prose prose-headings:font-sans prose-h1:title-large prose-h2:title-medium prose-h3:title-small prose-p:body-medium prose-ul:unordered-list prose-ol:ordered-list max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
