import Image from 'next/image';
import Link from 'next/link';

export interface ContentPreviewProps {
    title: string;
    preview: string;
    // do not need date for projects
    date?: string;
    // do not need thumbnail for some blogs
    thumbnailUrl?: string;
    // do not need github link for blogs or some projects
    links?: {
        type: 'github' | 'external' | 'internal';
        url: string;
        label: string;
    }[];
}

export default function ContentPreview({ title, preview, date, thumbnailUrl, links }: ContentPreviewProps) {
    return (
        <div className="content_preview">
            {thumbnailUrl && (
                <div className="content_preview_image_container">
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        width={128}
                        height={128}
                        className="content_preview_image"
                    />
                </div>
            )}
            <div className="content_preview_content">
                <h2 className="title-small">{title}</h2>
                {date && <p className="body-small text-foreground">{date}</p>}
                <p className="body-small">{preview}</p>
                {links && links.length > 0 && (
                    <div className="content_preview_links">
                        {links.map((link, index) => {
                            if (link.type === 'internal') {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className="preview_link"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            } else if (link.type === 'external') {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className="preview_link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            } else if (link.type === 'github') {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className="preview_link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </Link>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
