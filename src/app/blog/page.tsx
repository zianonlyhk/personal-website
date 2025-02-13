import BlogPostPreview from '@/src/components/BlogPostPreview';
import { getListOfBlogPosts } from '@/src/lib/blog_page_generator';

export default async function Blog() {
    const blogPosts = await getListOfBlogPosts();

    return (
        <div className="blog_post_container items-center">
            <h1 className="title-boss">Blog Posts</h1>
            <div className="blog_post_preview_container">
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