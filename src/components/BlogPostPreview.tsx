interface BlogPostPreviewProps {
    title: string;
    preview: string;
    date: string;
    href: string;
}

export default function BlogPostPreview({ title, preview, date, href }: BlogPostPreviewProps) {
    return (
        <article className="blog_post_preview">
            <h2 className="title-small">{title}</h2>
            <p className="body-small">{preview}</p>
            <div className="flex justify-between items-center">
                <span className="body-small">{date}</span>
                <a href={href} className="preview_link">Read more →</a>
            </div>
        </article>
    );
} 