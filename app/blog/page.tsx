import BlogPostPreview from '../components/blog/BlogPostPreview';

export default function Blog() {
    // Example blog posts data - you can replace this with real data later
    const blogPosts = [
        {
            title: "Blog Post Title 1",
            preview: "Preview of the blog post content...",
            date: "March 14, 2024",
            href: "/blog/post-1"
        },
        {
            title: "Blog Post Title 2",
            preview: "Preview of the blog post content...",
            date: "March 14, 2024",
            href: "/blog/post-2"
        },
        {
            title: "Blog Post Title 3",
            preview: "Preview of the blog post content...",
            date: "March 14, 2024",
            href: "/blog/post-3"
        }
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="max-w-3xl w-full space-y-6">
                {blogPosts.map((post, index) => (
                    <BlogPostPreview
                        key={index}
                        title={post.title}
                        preview={post.preview}
                        date={post.date}
                        href={post.href}
                    />
                ))}
            </div>
        </div>
    );
} 