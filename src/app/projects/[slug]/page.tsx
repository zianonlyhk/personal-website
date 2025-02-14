import { getContentPage } from '@/src/lib/content_page_generator';
import { notFound } from 'next/navigation';

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
            <h1 className="title-boss">{post.title}</h1>
            {/* <div className="content_date">{post.date}</div> */}
            <div className="content_content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}