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
function ContentLinks({ links, isVip = false }: { links: LinkType[]; isVip?: boolean }) {
    return (
        <div className={`content_preview_links`}>
            {links.map((link, index) => {
                if (link.type === 'internal') {
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`${link.className} text-xs font-medium`}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${link.label}`}
                        >
                            {link.label}
                        </Link>
                    );
                } else if (link.type === 'external' || link.type === 'github') {
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`${link.className} ${link.type === 'github' ? 'github-link' : ''} ${isVip ? 'vip' : ''} text-xs font-medium`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${link.label} (opens in new tab)`}
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
    date?: string;
    thumbnailUrl?: string;
    links?: LinkType[];
    titleUrl?: string;
    isVip?: boolean;
}

export default function ContentPreview({ title, preview, date, thumbnailUrl, links, titleUrl, isVip }: ContentPreviewProps) {
    return (
        <div className="content_preview">
            {titleUrl ? (
                <div className="relative group">
                    <Link href={titleUrl} className="absolute inset-0 z-10" aria-label={`View ${title}`} />
                    <div className="content_preview_inner">
                        {thumbnailUrl && (
                            <div className="content_preview_image">
                                <Image
                                    src={thumbnailUrl}
                                    alt={title}
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        )}
                        <div className="content_preview_content">
                            <h2 className={`content_preview_title title-small ${isVip ? 'vip' : ''}`}>{title}</h2>
                            <p className="body-small text-muted-foreground">{preview}</p>
                            <div className="content_preview_footer">
                                {date && <p className="text-xs text-muted-foreground">{date}</p>}
                                {links && links.length > 0 && (
                                    <div className="relative z-20">
                                        <ContentLinks links={links} isVip={isVip} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="content_preview_inner">
                    {thumbnailUrl && (
                        <div className="content_preview_image">
                            <Image
                                src={thumbnailUrl}
                                alt={title}
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}
                    <div className="content_preview_content">
                        <h2 className={`content_preview_title title-small ${isVip ? 'vip' : ''}`}>{title}</h2>
                        <p className="body-small text-muted-foreground">{preview}</p>
                        <div className="content_preview_footer">
                            {date && <p className="text-xs text-muted-foreground">{date}</p>}
                            {links && links.length > 0 && <ContentLinks links={links} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
