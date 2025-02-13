interface ProjectPreviewProps {
    title: string;
    preview: string;
    date: string;
    href: string;
    githubUrl: string;
    thumbnailUrl: string;
}

export default function ProjectPreview({ title, preview, date, href, githubUrl, thumbnailUrl }: ProjectPreviewProps) {
    return (
        <article className="project_preview">
            <div className="project_preview_image_container">
                <img src={thumbnailUrl} alt={title} className="project_preview_image" />
            </div>
            <div className="project_preview_content">
                <h2 className="title-small">{title}</h2>
                <p className="body-small">{preview}</p>
                <div className="project_preview_footer">
                    <span className="body-small">{date}</span>
                    <div className="project_preview_links">
                        <a href={githubUrl} className="project_preview_link" target="_blank" rel="noopener noreferrer">
                            GitHub →
                        </a>
                        <a href={href} className="project_preview_link">
                            Read more →
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
