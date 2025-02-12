import { getBlogPost, getListOfBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getListOfBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    // Got this error:
    // Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    // So I had to await the params
    const awaited_params = await params;
    const post = await getBlogPost(awaited_params.slug);
    
    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-600 mb-8">{post.date}</div>
            <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    );
} 