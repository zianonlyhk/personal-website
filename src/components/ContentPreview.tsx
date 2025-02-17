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
        className?: string;
    }[];
}

export default function ContentPreview({ title, preview, date, thumbnailUrl, links }: ContentPreviewProps) {
    return (
        <div className="content_preview">
            <div className="content_preview_header">
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
                <div className="content_preview_title">
                    <h2 className="title-small">{title}</h2>
                    {links && links.length > 0 && (
                        <div className="content_preview_links">
                            {links.map((link, index) => {
                                if (link.type === 'internal') {
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={link.className}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                } else if (link.type === 'external') {
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={link.className}
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
                                            className={link.className}
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
            <p className="body-small mb-1 md:mb-2">{preview}</p>
            {date && <p className="body-small text-foreground text-right">{date}</p>}

        </div>
    );
}
