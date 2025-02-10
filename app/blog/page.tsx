export default function Blog() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="max-w-3xl w-full space-y-6">
                {/* Example blog post preview */}
                <article className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-2">Blog Post Title</h2>
                    <p className="text-gray-400 mb-4">Preview of the blog post content...</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">March 14, 2024</span>
                        <a href="#" className="text-primary-500 hover:text-primary-400">Read more →</a>
                    </div>
                </article>
            </div>
        </div>
    );
} 