interface BlogPostPreviewProps {
    title: string;
    preview: string;
    date: string;
    href: string;
}

export default function BlogPostPreview({ title, preview, date, href }: BlogPostPreviewProps) {
    return (
        <article className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="">{preview}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm">{date}</span>
                <a href={href} className="text-primary-500 hover:text-primary-400">Read more →</a>
            </div>
        </article>
    );
} 