import BlogPostPreview from '@/src/components/blog/BlogPostPreview';
import { getListOfBlogPosts } from '@/src/lib/blog';

export default async function Blog() {
    const blogPosts = await getListOfBlogPosts();

    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="max-w-3xl w-full space-y-6">
                {blogPosts.map((post) => (
                    <BlogPostPreview
                        key={post.slug}
                        title={post.title}
                        preview={post.excerpt}
                        date={post.date}
                        href={`/blog/${post.slug}`}
                    />
                ))}
            </div>
        </div>
    );
} 