import { getBlogPost, getListOfBlogPosts } from '@/src/lib/blog';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const posts = await getListOfBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
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
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="mb-8">{post.date}</div>
            <div className="flex flex-col items-center sm:items-start individualBlogPost" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
} 