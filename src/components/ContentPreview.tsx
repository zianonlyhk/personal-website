// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import Image from 'next/image';
import Link from 'next/link';

// Link type definition
type LinkType = {
    type: 'github' | 'external' | 'internal';
    url: string;
    label: string;
    className?: string;
};

// Client component for handling links with click events
function ContentLinks({ links }: { links: LinkType[] }) {
    return (
        <div className="content_preview_links">
            {links.map((link, index) => {
                if (link.type === 'internal') {
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`${link.className} text-xs font-medium`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {link.label}
                        </Link>
                    );
                } else if (link.type === 'external' || link.type === 'github') {
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`${link.className} ${link.type === 'github' ? 'github-link' : ''} text-xs font-medium`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {link.label}
                        </Link>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
}

export interface ContentPreviewProps {
    title: string;
    preview: string;
    // do not need date for projects
    date?: string;
    // do not need thumbnail for some blogs
    thumbnailUrl?: string;
    // do not need github link for blogs or some projects
    links?: LinkType[];
    // URL for the title link (if title should be clickable)
    titleUrl?: string;
    // Whether this is a VIP content
    isVip?: boolean;
}

export default function ContentPreview({ title, preview, date, thumbnailUrl, links, titleUrl, isVip }: ContentPreviewProps) {
    const PreviewContent = (
        <div className="content_preview_inner">
            {thumbnailUrl && (
                <div className="content_preview_image">
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}
            <div className="content_preview_content">
                {titleUrl ? (
                    <Link href={titleUrl} className="inline-block no-underline">
                        <h2 className={`content_preview_title title-small ${isVip ? 'vip' : ''}`}>{title}</h2>
                    </Link>
                ) : (
                    <h2 className={`content_preview_title title-small ${isVip ? 'vip' : ''}`}>{title}</h2>
                )}
                <p className="body-small text-muted-foreground">{preview}</p>

                <div className="content_preview_footer">
                    {date && <p className="text-xs text-muted-foreground">{date}</p>}
                    {links && links.length > 0 && <ContentLinks links={links} />}
                </div>
            </div>
        </div>
    );

    return (
        <div className="content_preview">
            {PreviewContent}
        </div>
    );
}


// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
