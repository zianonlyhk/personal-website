// Author: Zian Huang
// Date Created: 2025-04-30
// ----------------------------------------

'use client';

import { useEffect, useState } from 'react';
import ContentPreview from '@/src/components/ContentPreview';
import Masonry from 'react-masonry-css';
import { fetchBlogPosts } from '../api/content';

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlogPosts() {
            try {
                const posts = await fetchBlogPosts();
                setBlogPosts(posts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadBlogPosts();
    }, []);

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
                    Thoughts and ideas, at the crossroad of math and computer
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-muted-foreground">Loading blog posts...</div>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                >
                    {blogPosts.map((eachPost) => {
                        // We'll only add GitHub links if they exist, but no "Read More" link
                        const links = [];

                        // Add GitHub link if it exists
                        if (eachPost.githubUrl) {
                            links.push({
                                type: 'github',
                                url: eachPost.githubUrl,
                                label: 'GitHub',
                                className: eachPost.isVip ? 'preview_link_accent' : 'preview_link'
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
        </div>
    );
}

// ----------------------------------------
// Copyright (c) 2025 Zian Huang. All rights reserved.
