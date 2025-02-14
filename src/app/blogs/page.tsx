import BlogPostPreview from '@/src/components/BlogPostPreview';
import { getContentList } from '@/src/lib/content_page_generator';

export default async function Blog() {
    const allMarkdownPosts = await getContentList('blogs');

    return (
        <div className="content_container items-center">
            <h1 className="title-boss">Blog Posts</h1>
            <div className="blog_post_preview_container">
                {allMarkdownPosts.map((eachPost) => (
                    <BlogPostPreview
                        key={eachPost.slug}
                        title={eachPost.title}
                        preview={eachPost.excerpt}
                        date={eachPost.date}
                        href={`/blogs/${eachPost.slug}`}
                    />
                ))}
            </div>
        </div>
    );
} 