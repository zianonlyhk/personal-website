import { getContentPage } from '@/src/lib/content_page_generator';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getContentPage(resolvedParams.slug, 'blogs');

    return (
        <div className="content_container">
            <h1 className="title-boss">{post.title}</h1>
            <div className="content_date">{post.date}</div>
            <div className="content_content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
} 