import { getBlogPost, getListOfBlogPosts } from '@/src/lib/blog_page_generator';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="blog_post_container">
            <h1 className="blog_post_title">{post.title}</h1>
            <div className="blog_post_date">{post.date}</div>
            <div className="blog_post_content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
} 