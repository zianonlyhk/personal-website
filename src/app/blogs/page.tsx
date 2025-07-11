// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useEffect, useState } from 'react';
import ContentPreview from '@/src/components/ContentPreview';
import { ContentGridSkeleton } from '@/src/components/LoadingSkeletons';

type BlogPost = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    thumbnailUrl: string;
    githubUrl?: string;
    isVip: boolean;
};

type LinkType = {
    type: 'github' | 'external' | 'internal';
    url: string;
    label: string;
    className: string;
};
import Masonry from 'react-masonry-css';
import { fetchBlogPosts } from '../../lib/content_api';

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const numberOfCardPerPage = 6;

    useEffect(() => {
        async function loadBlogPosts() {
            try {
                const allPosts = await fetchBlogPosts(1, 9999); // Get all to calculate total pages
                const posts = await fetchBlogPosts(currentPage);
                setBlogPosts(posts);
                setTotalPages(Math.ceil(allPosts.length / numberOfCardPerPage));
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadBlogPosts();
    }, [currentPage]);

    const breakpointColumns = {
        default: 3,
        1100: 2,
        700: 1,
        500: 1
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
            <div className="flex flex-col items-center mb-8">
                <h1 className="title-boss text-center">
                    <span className="text-primary">&gt;</span> <span className="font-mono">Blogs</span>
                </h1>
                <p className="body-medium text-muted-foreground mt-2 text-center max-w-2xl">
                    An archive of my thoughts at the crossroad of maths and computing
                </p>
            </div>

            {loading ? (
                <ContentGridSkeleton count={numberOfCardPerPage} />
            ) : (
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                >
                    {blogPosts.map((eachPost) => {
                        // We'll only add GitHub links if they exist, but no "Read More" link
                        const links: LinkType[] = [];

                        // Add GitHub link if it exists
                        if (eachPost.githubUrl) {
                            links.push({
                                type: 'github',
                                url: eachPost.githubUrl,
                                label: 'GitHub',
                                className: 'preview_link'
                            });
                        }

                        return (
                            <div key={eachPost.slug} className="mb-4">
                                <ContentPreview
                                    title={eachPost.title}
                                    preview={eachPost.excerpt}
                                    date={eachPost.date}
                                    thumbnailUrl={eachPost.thumbnailUrl}
                                    links={links}
                                    titleUrl={`/blogs/${eachPost.slug}`}
                                    isVip={eachPost.isVip}
                                />
                            </div>
                        );
                    })}
                </Masonry>
            )}

            {!loading && totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-background/80 hover:bg-muted disabled:hover:bg-transparent disabled:opacity-50 text-foreground transition-colors"
                    >
                        Previous
                    </button>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === page
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-background/80 hover:bg-muted text-foreground'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-background/80 hover:bg-muted disabled:hover:bg-transparent disabled:opacity-50 text-foreground transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
