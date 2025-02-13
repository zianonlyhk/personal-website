interface ProjectPreviewProps {
    title: string;
    preview: string;
    date: string;
    githubUrl: string;
    thumbnailUrl: string;
    href: string;
}

export default function ProjectPreview({ title, preview, href, date, githubUrl, thumbnailUrl }: ProjectPreviewProps) {
    return (
        <div className="project_preview">
            <div className="project_preview_image_container">
                <img src={thumbnailUrl} alt={title} className="project_preview_image" />
            </div>
            <div className="project_preview_content">
                <h2 className="title-small">{title}</h2>
                <p className="body-small">{preview}</p>
                <div>
                    <div className="project_preview_links">
                        <a href={githubUrl} className="preview_link" target="_blank" rel="noopener noreferrer">
                            GitHub →
                        </a>
                        <a href={href} className="preview_link">
                            Read more →
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
}
